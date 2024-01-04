import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/hooks';
import { createCheckIn } from './create';
import { validateCheckIns } from './validate';
import { summaryCheckIn } from './summary';
import { checkInsMetrics } from './metrics';

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/check-ins/summary', summaryCheckIn);
  app.get('/check-ins/metrics', checkInsMetrics);

  app.post('/gyms/:gymId/check-ins', createCheckIn);

  app.patch('/check-ins/:checkInId/validate', validateCheckIns);
}