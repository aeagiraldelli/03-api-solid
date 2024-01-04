import { makeUserProfileUseCase } from '@/use-case/factories';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userProfileUseCase = makeUserProfileUseCase();
  const { user } = await userProfileUseCase.exec({
    userId: request.user.sub
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  });
}