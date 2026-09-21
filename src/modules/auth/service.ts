import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { supabase } from "../../plugins/supabase.js";

import type { SignInInput, SignUpInput } from "./schema.js";

export async function signUp(input: SignUpInput) {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("Signup failed: no user returned");
  }

  // Persist a local profile row linked to the Supabase auth user
  await db.insert(users).values({
    authUid: data.user.id,
    email: input.email,
  });

  return data;
}

export async function signIn(input: SignInInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error) {
    throw error;
  }

  return data;
}
