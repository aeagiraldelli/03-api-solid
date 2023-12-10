import { CheckInsRepository } from '@/repositories';
import { UserMetricsUseCaseRequest, UserMetricsUseCaseResponse } from './user-metrics.types';

export class UserMetricsUseCase {
  constructor(private checkinsRepository: CheckInsRepository) { }

  async exec({ userId }: UserMetricsUseCaseRequest): Promise<UserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId(userId);
    return { checkInsCount };
  }
}