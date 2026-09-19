import type { FastifyPluginAsync } from 'fastify'

const usersRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return [
      {
        id: 1,
        name: 'Alice'
      }
    ]
  })

  app.get<{ Params: { id: string } }>('/:id', async (request) => {
    const { id } = request.params

    return {
      id,
      name: 'Alice'
    }
  })

  app.post<{
    Body: {
      name: string
      email: string
    }
  }>('/', async (request, reply) => {
    const { name, email } = request.body

    const user = {
      id: crypto.randomUUID(),
      name,
      email
    }

    return reply.code(201).send(user)
  })
}

export default usersRoutes