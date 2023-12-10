import { CheckInsRepository, GymRepository } from '@/repositories';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from './errors';

type CheckInUseCaseRequest = {
  gymId: string;
  userId: string;
  userLatitude: number;
  userLongitude: number;
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkinsRepository: CheckInsRepository, private gymsRepository: GymRepository) { }

  async exec({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError('Gym not found.');
    }

    // TODO: calculate distance between gym and user.

    const checkInAlreadyExists = await this.checkinsRepository.findByUserIdOnDate(userId, new Date());

    if (checkInAlreadyExists) {
      throw new Error('User can not make checkin twice at the same day.');
    }

    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId
    });

    return { checkIn };
  }
}