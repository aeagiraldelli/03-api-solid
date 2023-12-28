import { FastifyInstance } from 'fastify';
import { authenticate, profile, register } from './controllers';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/me', profile);
}