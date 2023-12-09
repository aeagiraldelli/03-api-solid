import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const usersRepo = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepo);

  return authenticateUseCase;
}