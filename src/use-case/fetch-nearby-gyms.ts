import { GymRepository } from '@/repositories';
import { FetchNearbyGymsUseCaseRequest, FetchNearbyGymsUseCaseResponse } from './fetch-nearby-gyms.types';

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymRepository) { }

  async exec(props: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const { userLatitude, userLongitude } = props;

    const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude });

    return { gyms };
  }
}