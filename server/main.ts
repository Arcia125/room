import { listen } from './src/app';
import config from './config';
import { logger } from './src/utils/logger';

listen({ port: config.PORT }, () => {
  logger.info(`Server is listening at http://localhost:${config.PORT}`);
}).then(() => {});
