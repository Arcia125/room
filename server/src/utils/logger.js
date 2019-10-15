import { format, transports, createLogger } from 'winston';

import config from '../../config';

const defaultConfigs = {
  logger: {
    level: config.LOG_LEVEL,
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console()],
    defaultMeta: {},
  },

  fileTransport: {
    filename: config.LOG_FILE_NAME,
    level: config.LOG_FILE_LEVEL,
    format: format.json(),
  },
};

/**
 * @description Default logger for backend app.
 * @example
 * logger.debug('Some', { message: 'debugging information'});
 * logger.info('Some', { message: 'more important information' });
 * logger.warn('Some', { message: 'warning information' });
 * logger.error('Some', { message: 'error message'});
 */
const logger = createLogger(defaultConfigs.logger);

if (config.LOG_FILE_NAME) {
  // outputs this logger to file if LOG_FILE_NAME is set in env
  logger.add(new transports.File(defaultConfigs.fileTransport));
}

export { logger, defaultConfigs };
