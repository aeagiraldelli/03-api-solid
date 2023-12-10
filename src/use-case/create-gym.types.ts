import { Gym } from '@prisma/client';

export type CreateGymUseCaseRequest = {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export type CreateGymUseCaseResponse = {
  gym: Gym
}