import type {
  FastifyPluginAsync,
} from 'fastify'

import { requireAuth } from '../../middleware/auth.js'
import { getOrCreateUser } from './service.js'

const userRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    '/me',
    {
      preHandler: requireAuth,
    },
    async (request, reply) => {
      const profile = await getOrCreateUser({
        userId: Number(request.user.id),
      })

      if (!profile) {
        return reply.code(404).send({
          error: {
            code: 'PROFILE_NOT_FOUND',
            message: 'Profile not found',
          },
        })
      }

      return {
        data: profile,
      }
    }
  )
}

export default userRoutes