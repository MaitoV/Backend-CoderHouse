const winston = require('winston');
const { createLogger, format } = require('winston');
const { combine, printf, timestamp, colorize } = format;

const warnFilter = format((info) => {
    if(info.level.includes('warn')) return info;
    else return false;
})

  const logConfiguration = {
    level: 'info',
    format: combine(
      timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
      }),
      colorize(),
      printf((info) => `${info.level} |  ${[info.timestamp]} | ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'warn',
            filename: './../logs/warn.log',
            format: combine(warnFilter(), timestamp(), printf(info => {
                return `${info.level}  | ${[info.timestamp]} | ${info.message}`;
              })),
        })
    ],
  };

  const logger = createLogger(logConfiguration);

  // Log a message
  logger.silly('Imprimimos Silly');
  logger.debug('Imprimimos Debug');
  logger.verbose('Imprimimos Verbose');
  logger.info('Imprimimos Info');
  logger.warn('Imprimimos Warn');
  logger.error('Imprimimos Error');
  logger.warn('Imprimimos Warn');

