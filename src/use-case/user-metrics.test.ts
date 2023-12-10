import { CheckInsRepository } from '@/repositories';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserMetricsUseCase } from './user-metrics';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';

describe('User Metrics Use Case', () => {
  let checkinsRepository: CheckInsRepository;
  let sut: UserMetricsUseCase;

  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new UserMetricsUseCase(checkinsRepository);
  });

  it('should be able to get check ins count from metrics', async () => {
    await checkinsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    });

    await checkinsRepository.create({
      gym_id: 'gym-2',
      user_id: 'user-1'
    });

    const { checkInsCount } = await sut.exec({ userId: 'user-1' });

    expect(checkInsCount).toEqual(2);
  });
});