import { z } from 'zod'

export const signUpSchema = z.object({
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(8)
    .max(128),
})

export const signInSchema = z.object({
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(1),
})

export type SignUpInput =
  z.infer<typeof signUpSchema>

export type SignInInput =
  z.infer<typeof signInSchema>