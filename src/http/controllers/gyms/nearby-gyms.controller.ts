import { makeFetchNearbyGymUseCase } from '@/use-case/factories';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function nearbyGyms(request: FastifyRequest, reply: FastifyReply) {
  const nearbySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbySchema.parse(request.query);

  const searchNearbyUseCase = makeFetchNearbyGymUseCase();

  const { gyms } = await searchNearbyUseCase.exec({
    userLatitude: latitude,
    userLongitude: longitude
  });

  return reply.status(200).send({ gyms });
}