import { PrismaCheckInsRepository, PrismaGymsRepository } from '@/repositories/prisma';
import { CheckInUseCase } from '../check-in';

export function makeCheckInUseCase(): CheckInUseCase {
  const checkInsRepo = new PrismaCheckInsRepository();
  const gymsRepo = new PrismaGymsRepository();

  const checkInUseCase = new CheckInUseCase(checkInsRepo, gymsRepo);

  return checkInUseCase;
}