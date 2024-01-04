import { makeValidateCheckInUseCase } from '@/use-case/factories';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function validateCheckIns(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = paramsSchema.parse(request.params);

  const useCase = makeValidateCheckInUseCase();

  const { checkIn } = await useCase.exec({
    checkInId
  });

  return reply.status(200).send({ checkIn });
}