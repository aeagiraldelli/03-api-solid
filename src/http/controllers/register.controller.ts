import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { RegisterUseCase } from '@/use-case/register.use-case';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = bodySchema.parse(request.body);

  try {
    const repository = new PrismaUserRepository();
    const registerUserUseCase = new RegisterUseCase(repository);
    await registerUserUseCase.exec({ name, email, password });
    return reply.status(201).send();
  } catch (err) {
    return reply.status(409).send();
  }
}