import { GymRepository } from '@/repositories';
import { CreateGymUseCaseRequest, CreateGymUseCaseResponse } from './create-gym.types';


export class CreateGymUseCase {
  constructor(private gymsRepository: GymRepository) { }

  async exec(props: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const { description, latitude, longitude, phone, name } = props;

    const gym = await this.gymsRepository.create({
      name,
      latitude,
      longitude,
      phone,
      description
    });

    return { gym };
  }
}