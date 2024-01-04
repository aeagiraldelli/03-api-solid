import { makeFetchUserCheckInsUseCase } from '@/use-case/factories';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function summaryCheckIn(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = querySchema.parse(request.query);

  const useCase = makeFetchUserCheckInsUseCase();

  const { checkIns } = await useCase.exec({
    page,
    userId: request.user.sub
  });

  return reply.status(200).send({ checkIns });
}