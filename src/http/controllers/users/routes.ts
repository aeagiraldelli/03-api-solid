import { FastifyInstance } from 'fastify';
import { authenticate, profile, register } from '.';
import { verifyJWT } from '../../hooks';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // authenticated routes.
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}