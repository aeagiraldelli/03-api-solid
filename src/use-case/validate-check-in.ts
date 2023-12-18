import { CheckInsRepository } from '@/repositories';
import { ValidateCheckInUseCaseRequest, ValidateCheckInUseCaseResponse } from './validate-check-in.types';
import { CheckInValidationExpiredError, ResourceNotFoundError } from './errors';
import dayjs from 'dayjs';

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async exec(params: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const { checkInId } = params;

    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const diffInMinutes = dayjs(new Date()).diff(checkIn.created_at, 'minutes');
    if (diffInMinutes > 20) {
      throw new CheckInValidationExpiredError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}