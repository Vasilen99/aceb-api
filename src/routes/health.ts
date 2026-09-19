import type { FastifyPluginAsync } from 'fastify'
import { sql } from 'drizzle-orm'

import { db } from '../db/index.js'

const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/db', async (_request, reply) => {
    try {
      const result = await db.execute(sql`select 1 as connected`)

      return {
        database: 'connected',
        result,
      }
    } catch (error) {
      app.log.error(error)

      return reply.code(500).send({
        database: 'disconnected',
        error:
          error instanceof Error
            ? error.message
            : 'Unknown database error',
      })
    }
  })
}

export default healthRoutes