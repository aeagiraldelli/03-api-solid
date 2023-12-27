import { PrismaGymsRepository } from '@/repositories/prisma';
import { SearchGymUseCase } from '../search-gym';

export function makeSearchGymUseCase(): SearchGymUseCase {
  const gymRepo = new PrismaGymsRepository();
  const useCase = new SearchGymUseCase(gymRepo);

  return useCase;
}