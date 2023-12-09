import { compare } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { User } from '@prisma/client';

interface AuthenticateUseCaseProps {
  email: string,
  password: string,
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async exec(props: AuthenticateUseCaseProps): Promise<AuthenticateUseCaseResponse> {
    const { email, password } = props;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await compare(password, user.password_hash);
    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}