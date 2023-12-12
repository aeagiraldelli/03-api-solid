import { GymRepository } from '@/repositories';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Gym } from '@prisma/client';

describe('Fetch Nearby Gyms Use Case', () => {
  let gymsRepository: GymRepository;
  let sut: FetchNearbyGymsUseCase;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      latitude: -23.5346991,
      longitude: -47.1302965,
      name: 'TypeScript Academy',
    });

    await gymsRepository.create({
      latitude: -23.4924244,
      longitude: -47.378981,
      name: 'JavaScript Academy',
    });

    const { gyms } = await sut.exec({ userLatitude: -23.5355764, userLongitude: -47.1483967 });

    expect(gyms).toBeInstanceOf(Array<Gym>);
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'TypeScript Academy' }),
    ]);
  });

  it('should not be able to fetch distant gyms', async () => {
    await gymsRepository.create({
      latitude: -23.5346991,
      longitude: -47.1302965,
      name: 'TypeScript Academy',
    });

    await gymsRepository.create({
      latitude: -23.5345417,
      longitude: -47.1293094,
      name: 'JavaScript Academy',
    });

    const { gyms } = await sut.exec({ userLatitude: -23.4924244, userLongitude: -47.378981 });

    expect(gyms).toBeInstanceOf(Array<Gym>);
    expect(gyms).toHaveLength(0);
  });
});