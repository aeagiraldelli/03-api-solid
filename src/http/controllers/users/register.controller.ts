import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { EmailRegisteredError } from '@/use-case/errors';
import { makeRegisterUseCase } from '@/use-case/factories';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = bodySchema.parse(request.body);

  try {
    const registerUserUseCase = makeRegisterUseCase();
    await registerUserUseCase.exec({ name, email, password });
    return reply.status(201).send();
  } catch (err) {
    if (err instanceof EmailRegisteredError) {
      return reply.status(409).send({ error: err.message });
    }

    throw err;
  }
}