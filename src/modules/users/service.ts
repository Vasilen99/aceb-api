// src/modules/users/user.service.ts

import {
  findProfileById,
} from './repository.js'

export async function getOrCreateUser(input: {
  userId: number
  email?: string
}) {
  const existingUser = await findProfileById(
    input.userId
  )

  if (existingUser) {
    return existingUser
  }
  return null;
}