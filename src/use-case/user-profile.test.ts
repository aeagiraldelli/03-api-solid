import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { ResourceNotFoundError } from './errors';
import { UserProfileUseCase } from '.';

let userRepo: InMemoryUserRepository;
let sut: UserProfileUseCase;

describe('User Profile use case', () => {

  beforeEach(() => {
    userRepo = new InMemoryUserRepository();
    sut = new UserProfileUseCase(userRepo);
  });

  it('should be able to get user profile', async () => {
    const email = 'johndoe@email.com';
    const password = '123456';
    const password_hash = await hash(password, 6);

    const createdUser = await userRepo.create({
      name: 'John Doe',
      email,
      password_hash
    });

    const { user } = await sut.exec({
      userId: createdUser.id
    });

    expect(user.id).toEqual(createdUser.id);
  });

  it('should not be able to get user profile wit wrong id', async () => {
    const email = 'johndoe@email.com';
    const password = '123456';
    const password_hash = await hash(password, 6);

    await userRepo.create({
      name: 'John Doe',
      email,
      password_hash
    });

    expect(() => sut.exec({
      userId: 'non-existing-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});