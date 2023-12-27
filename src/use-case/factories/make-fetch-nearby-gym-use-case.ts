import { PrismaGymsRepository } from '@/repositories/prisma';
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';

export function makeFetchNearbyGymUseCase(): FetchNearbyGymsUseCase {
  const gymRepo = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymRepo);

  return useCase;
}