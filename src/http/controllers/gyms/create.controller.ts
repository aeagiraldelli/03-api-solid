import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateGymUseCase } from '@/use-case/factories';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymSchema = z.object({
    name: z.string(),
    description: z.string().nullable().default(''),
    phone: z.string().nullable().default(''),
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180;
    })
  });

  const { name, description, phone, latitude, longitude } = createGymSchema.parse(request.body);

  const createGymUseCase = makeCreateGymUseCase();
  await createGymUseCase.exec({
    name, description, phone, latitude, longitude
  });

  return reply.status(201).send();
}