import { supabase } from '../../plugins/supabase.js'

import type {
  SignInInput,
  SignUpInput,
} from './schema.js'

export async function signUp(
  input: SignUpInput
) {
  const { data, error } =
    await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    })

  if (error) {
    console.error('SUPABASE SIGNUP ERROR', {
      name: error.name,
      message: error.message,
      status: error.status,
      code: error.code,
    })

    throw error
  }

  return data
}

export async function signIn(
  input: SignInInput
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    })

  if (error) {
    throw error
  }

  return data
}