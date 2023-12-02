import { hash } from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';

interface RegisterUserUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) { }
  async exec(user: RegisterUserUseCaseProps) {
    const { name, email, password } = user;

    const registeredUser = await this.userRepository.findByEmail(email);

    if (registeredUser) {
      throw new Error('E-mail already used.');
    }

    const password_hash = await hash(password, 6);

    await this.userRepository.create({ name, email, password_hash });
  }
}