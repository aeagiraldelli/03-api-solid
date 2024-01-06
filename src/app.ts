import { ZodError } from 'zod';
import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

import { env } from './env';
import { userRoutes } from './http/controllers/users';
import { gymsRoutes } from './http/controllers/gyms';
import { checkInsRoutes } from './http/controllers/check-ins';

export const app = fastify();

app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
  sign: {
    expiresIn: '10m',
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
});

app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).
      send({ message: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: here we should log to an external tool like DataDog/NewRelic
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});