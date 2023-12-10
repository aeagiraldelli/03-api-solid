import { CheckInsRepository } from '@/repositories';
import { UserCheckInsHistoryRequest, UserCheckInsHistoryResponse } from './fetch-user-check-ins-history.types';

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private checkinsRepository: CheckInsRepository) { }

  async exec({ userId, page }: UserCheckInsHistoryRequest): Promise<UserCheckInsHistoryResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(userId, page);
    return { checkIns };
  }
}