import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors';

interface UserProfileUseCaseResquest {
  userId: string
}

interface UserProfileUseCaseResponse {
  user: User
}

export class UserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async exec({ userId }: UserProfileUseCaseResquest): Promise<UserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}