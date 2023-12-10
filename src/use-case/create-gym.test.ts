import { GymRepository } from '@/repositories';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymUseCase } from './create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

describe('Create Gym Use Case', () => {
  let gymsRepository: GymRepository;
  let sut: CreateGymUseCase;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.exec({
      name: 'Amazfit Academy',
      description: 'Amazfit',
      latitude: -23.5425341,
      longitude: -47.1558656,
      phone: '+55 11 11111-1111',
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});