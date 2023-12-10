import { beforeEach, describe, expect, it } from 'vitest';

import { CheckInsRepository } from '@/repositories';
import { FetchMemberCheckInsHistoryUseCase } from './fetch-user-check-ins-history';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';
import { CheckIn } from '@prisma/client';

describe('Fetch User Check Ins Use Case', () => {
  let checkInsRepository: CheckInsRepository;
  let sut: FetchMemberCheckInsHistoryUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchMemberCheckInsHistoryUseCase(checkInsRepository);
  });

  it('should be able to fetch user check ins', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkIns } = await sut.exec({ userId: 'user-01', page: 1 });

    expect(checkIns).toBeInstanceOf(Array<CheckIn>);
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ]);
  });

  it('should be able to fetch paginated user check ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      });
    }

    const { checkIns } = await sut.exec({ userId: 'user-01', page: 2 });

    expect(checkIns).toBeInstanceOf(Array<CheckIn>);
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ]);
  });
});