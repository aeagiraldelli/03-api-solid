import { GymRepository } from '@/repositories';
import { SearchGymUseCaseRequest, SearchGymUseCaseResponse } from './search-gym.types';

export class SearchGymUseCase {
  constructor(private gymsRepository: GymRepository) { }

  async exec({ query, page }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findByName(query, page);
    return { gyms };
  }
}