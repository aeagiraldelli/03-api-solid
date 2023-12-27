import { PrismaCheckInsRepository } from '@/repositories/prisma';
import { ValidateCheckInUseCase } from '../validate-check-in';

export function makeValidateCheckInUseCase(): ValidateCheckInUseCase {
  const checkInsRepo = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepo);

  return useCase;
}