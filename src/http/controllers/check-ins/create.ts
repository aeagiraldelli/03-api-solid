import { makeCheckInUseCase } from '@/use-case/factories';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createCheckIn(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    gymId: z.string().uuid()
  });

  const bodySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180;
    })
  });

  const { gymId } = paramsSchema.parse(request.params);
  const { latitude, longitude } = bodySchema.parse(request.body);

  const useCase = makeCheckInUseCase();

  await useCase.exec({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  reply.status(201).send();
}