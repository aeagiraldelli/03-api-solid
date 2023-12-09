import { describe, expect, it } from 'vitest';

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate use case', () => {
  it('should be able to authenticate', async () => {
    const userRepo = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(userRepo);

    const email = 'johndoe@email.com';
    const password = '123456';
    const password_hash = await hash(password, 6);

    await userRepo.create({
      name: 'John Doe',
      email,
      password_hash
    });

    const { user } = await sut.exec({
      email: 'johndoe@email.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong e-mail', async () => {
    const userRepo = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(userRepo);

    await expect(() => sut.exec({
      email: 'johndoe@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const userRepo = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(userRepo);

    const email = 'johndoe@email.com';
    const password = '123456';
    const password_hash = await hash(password, 6);

    await userRepo.create({
      name: 'John Doe',
      email,
      password_hash
    });

    await expect(() => sut.exec({
      email: 'johndoe@email.com',
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});