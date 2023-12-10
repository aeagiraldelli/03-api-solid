import { randomUUID } from 'node:crypto';
import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {

  private data: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.data.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIns = this.data.find((el) => {
      const checkInDate = dayjs(el.created_at);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return el.user_id == userId && isOnSameDate;
    });

    if (!checkIns) {
      return null;
    }

    return checkIns;
  }
}