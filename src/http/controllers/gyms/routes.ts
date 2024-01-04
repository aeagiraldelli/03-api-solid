import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/hooks';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);
  
}