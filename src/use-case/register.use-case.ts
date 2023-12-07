import { hash } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { EmailRegisteredError } from './errors/email-registered-error';
import { User } from '@prisma/client';

interface RegisterUserUseCaseProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) { }
  async exec(props: RegisterUserUseCaseProps): Promise<RegisterUseCaseResponse> {
    const { name, email, password } = props;

    const registeredUser = await this.userRepository.findByEmail(email);

    if (registeredUser) {
      throw new EmailRegisteredError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.userRepository.create({ name, email, password_hash });

    return { user };
  }
}