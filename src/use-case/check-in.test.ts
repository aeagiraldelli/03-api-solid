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
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      name: 'Amazfit Academy',
      description: 'Amazfit',
      latitude: new Decimal(-23.5425341),
      longitude: new Decimal(-47.1558656),
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
      userLatitude: -23.5425341,
      userLongitude: -47.1558656,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice at the same day', async () => {
    vi.setSystemTime(new Date(2023, 12, 9, 8, 0, 0));

    await sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -23.5425341,
      userLongitude: -47.1558656,
    });

    await expect(() => sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -23.5425341,
      userLongitude: -47.1558656,
    })).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice in different day', async () => {
    vi.setSystemTime(new Date(2023, 12, 9, 8, 0, 0));

    await sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -23.5425341,
      userLongitude: -47.1558656,
    });

    vi.setSystemTime(new Date(2023, 12, 10, 8, 0, 0));

    const { checkIn } = await sut.exec({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -23.5425341,
      userLongitude: -47.1558656,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.create({
      id: 'gym-02',
      name: 'Amazfit Academy',
      description: 'Amazfit',
      latitude: -23.5316749,
      longitude: -46.8954553,
      phone: '+55 11 11111-1111',
    });

    await expect(() => sut.exec({
      gymId: 'gym-02',
      userId: 'user-id',
      userLatitude: -23.5425341,
      userLongitude: -47.1558656,
    })).rejects.toBeInstanceOf(Error);
  });
});