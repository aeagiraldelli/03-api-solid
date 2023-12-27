import { PrismaCheckInsRepository } from '@/repositories/prisma';
import { FetchMemberCheckInsHistoryUseCase } from '../fetch-user-check-ins-history';

export function makeFetchUserCheckInsUseCase(): FetchMemberCheckInsHistoryUseCase {
  const checkInsRepo = new PrismaCheckInsRepository();
  const useCase = new FetchMemberCheckInsHistoryUseCase(checkInsRepo);

  return useCase;
}