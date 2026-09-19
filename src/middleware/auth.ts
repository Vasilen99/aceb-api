import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify'

import { supabase } from '../plugins/supabase.js'

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authorization = request.headers.authorization

  console.log('Authorization header:', authorization)

  if (!authorization?.startsWith('Bearer ')) {
    return reply.code(401).send({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Missing access token',
      },
    })
  }

  const token = authorization.slice(7)

  const {
    data,
    error,
  } = await supabase.auth.getClaims(token)

  if (error || !data?.claims?.sub) {
    return reply.code(401).send({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired access token',
      },
    })
  }

  request.user = {
    id: data.claims.sub,
    email:
      typeof data.claims.email === 'string'
        ? data.claims.email
        : undefined,
  }
}