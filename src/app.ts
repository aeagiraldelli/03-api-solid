import { ZodError } from 'zod';
import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';

import { env } from './env';
import { userRoutes } from './http/controllers/users';
import { gymsRoutes } from './http/controllers/gyms';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY
});

app.register(userRoutes);
app.register(gymsRoutes);

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