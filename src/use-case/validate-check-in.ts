import { CheckInsRepository } from '@/repositories';
import { ValidateCheckInUseCaseRequest, ValidateCheckInUseCaseResponse } from './validate-check-in.types';
import { ResourceNotFoundError } from './errors';

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async exec(params: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const { checkInId } = params;

    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}