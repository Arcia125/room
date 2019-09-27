import dotenv from 'dotenv';

dotenv.config();

const defaults = {
  PRODUCTION: 'false',
  PORT: 9001,
  JWT_SECRET: 'jwt-secret',
  SALTING_ROUNDS: 10,
  MONGODB_URI: 'mongodb://localhost:27017/room-dev',
  REACT_APP_GRAPHQL_HTTP_ENDPOINT: '/graphql',
  REACT_APP_GRAPHQL_WS_ENDPOINT: '/graphql-subscriptions',
  LOG_FILE_NAME: null,
  LOG_LEVEL: 'info',
};

const config = {
  ...defaults,
  ...process.env,
};

export default config;
