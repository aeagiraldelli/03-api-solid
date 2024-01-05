import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthUser } from '@/utils/test/create-and-auth-user';

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthUser(app);
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript Akademy',
        description: 'Akademy',
        latitude: -27.2092052,
        longitude: -49.6401091
      });

    expect(response.statusCode).toEqual(201);
  });
});