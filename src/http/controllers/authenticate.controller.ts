import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { InvalidCredentialsError } from '@/use-case/errors';
import { makeAuthenticateUseCase } from '@/use-case/factories';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    await authenticateUseCase.exec({
      email,
      password
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  reply.status(200).send();
}