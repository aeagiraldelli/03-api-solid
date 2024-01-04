import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeSearchGymUseCase } from '@/use-case/factories';

export async function searchGym(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchQuerySchema.parse(request.query);

  const searchCase = makeSearchGymUseCase();

  const { gyms } = await searchCase.exec({
    query: q,
    page
  });

  return reply.status(200).send({ gyms });
}