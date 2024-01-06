import { FastifyInstance } from 'fastify';

import { authenticate, profile, refresh, register } from '.';
import { verifyJWT } from '../../hooks';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  // authenticated routes.
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}