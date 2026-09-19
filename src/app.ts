import Fastify from 'fastify'
import usersRoutes from './routes/user.js'

export function buildApp() {
  const app = Fastify({
    logger: true
  })

  app.get('/health', async () => {
    return {
      status: 'ok'
    }
  })

  app.register(usersRoutes, {
    prefix: '/api/users'
  })

  return app
}