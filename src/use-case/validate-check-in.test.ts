import { CheckInsRepository } from '@/repositories';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ValidateCheckInUseCase } from './validate-check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';
import { CheckInValidationExpiredError, ResourceNotFoundError } from './errors';

describe('Validade Check In Use Case', () => {

  let checkinsRepository: CheckInsRepository;
  let sut: ValidateCheckInUseCase;

  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkinsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkinsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    });

    const { checkIn } = await sut.exec({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.id).toEqual(expect.any(String));
    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate inexistent check-in', async () => {
    await expect(() => sut.exec({ checkInId: 'fake-id' }))
      .rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validade check-in after 20 minutes after its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkinsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    });

    const minutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(minutesInMs);

    await expect(() => sut.exec({
      checkInId: createdCheckIn.id,
    })).rejects.toBeInstanceOf(CheckInValidationExpiredError);
  });
});