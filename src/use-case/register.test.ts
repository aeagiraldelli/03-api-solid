import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register.use-case';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { EmailRegisteredError } from './errors/email-registered-error';

describe('Register use case', () => {
  it('should be able to register', async () => {
    const userRepo = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepo);

    const { user } = await registerUseCase.exec({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const userRepo = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepo);

    const { user } = await registerUseCase.exec({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });

    const isPasswordHashed = await compare('123456', user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it('should not be able to register with same email twice.', async () => {
    const userRepo = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepo);

    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    };

    await registerUseCase.exec(user);

    await expect(() => registerUseCase.exec(user)).rejects.toBeInstanceOf(EmailRegisteredError);
  });
});