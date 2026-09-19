import type {
  FastifyPluginAsync,
} from 'fastify'

import {
  signInSchema,
  signUpSchema,
} from './schema.js'

import {
  signIn,
  signUp,
} from './service.js'

const authRoutes: FastifyPluginAsync =
  async (app) => {
    app.post(
      '/signup',
      async (request, reply) => {
        const result =
          signUpSchema.safeParse(
            request.body
          )

        if (!result.success) {
          return reply.code(400).send({
            error: {
              code: 'VALIDATION_ERROR',
              message:
                'Invalid signup data',
              details:
                result.error.flatten(),
            },
          })
        }

        try {
          const data =
            await signUp(result.data)

          return reply.code(201).send({
            data: {
              user: data.user,
              session: data.session,
            },
          })
        } catch (error) {
          request.log.error(error)

          return reply.code(400).send({
            error: {
              code: 'SIGNUP_FAILED',
              message:
                'Unable to create account',
            },
          })
        }
      }
    )

    app.post(
      '/signin',
      async (request, reply) => {
        const result =
          signInSchema.safeParse(
            request.body
          )

        if (!result.success) {
          return reply.code(400).send({
            error: {
              code: 'VALIDATION_ERROR',
              message:
                'Invalid credentials',
            },
          })
        }

        try {
          const data =
            await signIn(result.data)

          return {
            data: {
              user: data.user,
              session: data.session,
            },
          }
        } catch (error) {
          request.log.error(error)

          return reply.code(401).send({
            error: {
              code:
                'INVALID_CREDENTIALS',
              message:
                'Invalid email or password',
            },
          })
        }
      }
    )
  }

export default authRoutes