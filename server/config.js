const defaults = {
  PORT: 9001,
  JWT_SECRET: 'jwt-secret',
  SALTING_ROUNDS: 10,
  MONGODB_URI: 'mongodb://localhost:27017/room-dev',
};

const config = {
  ...defaults,
  ...process.env,
};

export default config;
