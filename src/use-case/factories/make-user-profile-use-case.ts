import { PrismaUserRepository } from '@/repositories/prisma';
import { UserProfileUseCase } from '../user-profile';

export function makeUserProfileUseCase(): UserProfileUseCase {
  const userRepo = new PrismaUserRepository();
  const useCase = new UserProfileUseCase(userRepo);

  return useCase;
}