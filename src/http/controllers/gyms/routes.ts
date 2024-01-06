import { FastifyInstance } from 'fastify';

import { verifyJWT, verifyUserRole } from '@/http/hooks';
import { searchGym } from './search.controller';
import { nearbyGyms } from './nearby-gyms.controller';
import { create } from './create.controller';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/gyms/search', searchGym);
  app.get('/gyms/nearby', nearbyGyms);

  app.post('/gyms', {
    onRequest: [
      verifyUserRole('ADMIN')
    ]
  }, create);
}