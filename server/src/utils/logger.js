import winston from 'winston';
import config from '../../config';

const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: winston.format.json(),
  defaultMeta: { service: 'room' },
});

if (config.LOG_FILE_NAME) {
  logger.add(
    new winston.transports.File({
      filename: config.LOG_FILE_NAME,
    })
  );
}

export { logger };
