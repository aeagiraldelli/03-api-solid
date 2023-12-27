import { CheckIn, Prisma } from '@prisma/client';

import { CheckInsRepository } from '../checkins-repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepository {

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const createdCheckIn = await prisma.checkIn.create({ data });
    return createdCheckIn;
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const updatedCheckin = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    });

    return updatedCheckin;
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        }
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    });

    return checkIns;
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id: checkInId }
    });

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    });

    return count;
  }
}