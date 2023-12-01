import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterUserUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export async function registerUserUseCase(user: RegisterUserUseCaseProps) {
  const { name, email, password } = user;

  const registeredUser = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  if (registeredUser) {
    throw new Error('E-mail already used.');
  }

  const password_hash = await hash(password, 6);
  await prisma.user.create({
    data: {
      name, email, password_hash,
    }
  });
}