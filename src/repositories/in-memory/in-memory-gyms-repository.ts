import { randomUUID } from 'node:crypto';

import { Gym, Prisma } from '@prisma/client';
import { GymRepository } from '../gyms-repository';
import { ResourceNotFoundError } from '@/use-case/errors';
import { Decimal } from '@prisma/client/runtime/library';

export class InMemoryGymsRepository implements GymRepository {
  private data: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.data.find((g) => g.id === gymId);

    if (!gym) {
      throw new ResourceNotFoundError('Gym not found.');
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      description: data.description ? data.description : null,
      phone: data.phone ? data.phone : null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.data.push(gym);

    return gym;
  }

  async findByName(name: string, page: number): Promise<Gym[]> {
    const gyms = this.data.filter(el => {
      return el.name.toLowerCase().includes(name.toLowerCase());
    }).slice((page - 1) * 20, page * 20);

    return gyms;
  }
}