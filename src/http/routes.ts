import { FastifyInstance } from 'fastify';
import { authenticate, profile, register } from './controllers';
import { verifyJWT } from './hooks';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // authenticated routes.
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}