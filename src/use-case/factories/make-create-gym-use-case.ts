import { PrismaGymsRepository } from '@/repositories/prisma';
import { CreateGymUseCase } from '../create-gym';

export function makeCreateGymUseCase(): CreateGymUseCase {
  const gymRepo = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymRepo);

  return useCase;
}