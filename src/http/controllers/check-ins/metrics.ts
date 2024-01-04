import { makeUserMetricsUseCase } from '@/use-case/factories';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function checkInsMetrics(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeUserMetricsUseCase();
  const { checkInsCount } = await useCase.exec({
    userId: request.user.sub
  });

  return reply.status(200).send({ checkInsCount });
}