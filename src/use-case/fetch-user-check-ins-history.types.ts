import { CheckIn } from '@prisma/client';

export type UserCheckInsHistoryRequest = {
  userId: string;
  page: number;
}

export type UserCheckInsHistoryResponse = {
  checkIns: CheckIn[];
}