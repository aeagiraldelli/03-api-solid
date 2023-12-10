import { Gym, Prisma } from '@prisma/client';

export interface GymRepository {
  findById(gymId: string): Promise<Gym | null>;
  findByName(name: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}