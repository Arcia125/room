const defaults = {
  PORT: 9001,
  JWT_SECRET: 'jwt-secret',
  SALTING_ROUNDS: 10,
  DATABASE_URL: 'mongodb://localhost:27017/room-dev',
};

const config = {
  ...defaults,
  ...process.env,
};

export default config;
