import { CheckInsRepository, GymRepository } from '@/repositories';
import { CheckIn } from '@prisma/client';
import { CheckInError, ResourceNotFoundError } from './errors';
import { calculateDistance } from '@/utils';

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

  async exec(request: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const { gymId, userId, userLatitude, userLongitude } = request;

    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError('Gym not found.');
    }

    const distance = calculateDistance(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new CheckInError('Max distance error.');
    }

    const checkInAlreadyExists = await this.checkinsRepository.findByUserIdOnDate(userId, new Date());

    if (checkInAlreadyExists) {
      throw new CheckInError('Max number of check ins reached.');
    }

    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId
    });

    return { checkIn };
  }
}