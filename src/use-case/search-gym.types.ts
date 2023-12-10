import { Gym } from '@prisma/client';

export type SearchGymUseCaseRequest = {
  query: string;
  page: number;
}

export type SearchGymUseCaseResponse = {
  gyms: Gym[]
}