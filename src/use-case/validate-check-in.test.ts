import { CheckInsRepository } from '@/repositories';
import { beforeEach, describe, expect, it } from 'vitest';
import { ValidateCheckInUseCase } from './validate-check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';
import { ResourceNotFoundError } from './errors';

describe('Validade Check In Use Case', () => {

  let checkinsRepository: CheckInsRepository;
  let sut: ValidateCheckInUseCase;

  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkinsRepository);
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
});