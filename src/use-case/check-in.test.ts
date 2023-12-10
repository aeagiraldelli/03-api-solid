import { CheckInsRepository, GymRepository } from '@/repositories';
import { CheckInUseCase } from './check-in';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepository: CheckInsRepository;
let gymsRepository: GymRepository;
let sut: CheckInUseCase;

describe('Check Ins Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.create({
      id: 'gym-01',
      name: 'Amazfit Academy',
      description: 'Amazfit',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '+55 11 11111-1111',
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice at the same day', async () => {
    vi.setSystemTime(new Date(2023, 12, 9, 8, 0, 0));

    await sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() => sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    })).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice in different day', async () => {
    vi.setSystemTime(new Date(2023, 12, 9, 8, 0, 0));

    await sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2023, 12, 10, 8, 0, 0));

    const { checkIn } = await sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});