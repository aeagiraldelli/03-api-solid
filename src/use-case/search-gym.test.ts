import { GymRepository } from '@/repositories';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymUseCase } from './search-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Gym } from '@prisma/client';

describe('Search Gyms Use Case', () => {
  let gymsRepository: GymRepository;
  let sut: SearchGymUseCase;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it('should be able to search for a gym', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      latitude: 0,
      longitude: 0,
      name: 'Amazifit Academy',
    });

    await gymsRepository.create({
      id: 'gym-2',
      latitude: 0,
      longitude: 0,
      name: 'Fat Academy',
    });

    const { gyms } = await sut.exec({
      query: 'Amazifit',
      page: 1
    });

    expect(gyms).toBeInstanceOf(Array<Gym>);
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-1' }),
    ]);
  });

  it('should be able to search for a gym and get paginated result', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        latitude: 0,
        longitude: 0,
        name: 'Amazifit Academy',
      });
    }

    const { gyms } = await sut.exec({
      query: 'Amazifit',
      page: 2
    });

    expect(gyms).toBeInstanceOf(Array<Gym>);
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-21' }),
      expect.objectContaining({ id: 'gym-22' }),
    ]);
  });
});