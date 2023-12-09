import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUseCase } from '../register';

export function makeRegisterUseCase(): RegisterUseCase {
  const repository = new PrismaUserRepository();
  const registerUserUseCase = new RegisterUseCase(repository);

  return registerUserUseCase;
}