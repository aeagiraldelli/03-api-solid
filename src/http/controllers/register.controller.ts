import { FastifyReply, FastifyRequest } from 'fastify';
import { hash } from 'bcryptjs';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = bodySchema.parse(request.body);

  const registeredUser = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  if (registeredUser) {
    return reply.status(409).send();
  }

  const password_hash = await hash(password, 6);
  await prisma.user.create({
    data: {
      name, email, password_hash,
    }
  });

  reply.status(201).send();
}