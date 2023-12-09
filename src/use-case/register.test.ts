import { beforeEach, describe, expect, it } from 'vitest';
import { compare } from 'bcryptjs';

import { EmailRegisteredError } from './errors';
import { RegisterUseCase } from './register';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';

let userRepo: InMemoryUserRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    sut = new RegisterUseCase(userRepo);
  });

  it('should be able to register', async () => {

    const { user } = await sut.exec({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.exec({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    });

    const isPasswordHashed = await compare('123456', user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it('should not be able to register with same email twice.', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456'
    };

    await sut.exec(user);

    await expect(() => sut.exec(user)).rejects.toBeInstanceOf(EmailRegisteredError);
  });
});