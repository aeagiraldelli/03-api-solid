import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUserRepository implements UsersRepository {

  private data: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      name: data.name,
      email: data.email,
      created_at: new Date(),
      password_hash: data.password_hash,
      id: randomUUID(),
    };

    this.data.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.data.find(item => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}