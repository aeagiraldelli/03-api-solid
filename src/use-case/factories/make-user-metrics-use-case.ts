import { PrismaCheckInsRepository } from '@/repositories/prisma';
import { UserMetricsUseCase } from '../user-metrics';

export function makeUserMetricsUseCase(): UserMetricsUseCase {
  const checkInsRepo = new PrismaCheckInsRepository();
  const useCase = new UserMetricsUseCase(checkInsRepo);

  return useCase;
}