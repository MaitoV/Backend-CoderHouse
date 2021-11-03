const winston = require('winston');

const loggerConfiguration = {
    level: 'info',
    format: combine(
      colorize(),
      timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
      }),
      printf(info => {
        return `${info.level}  | ${[info.timestamp]} | ${info.message}`;
      }),
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        level: 'warn',
        filename: '../logs/warn.log',
        format: combine(warnFilter(), timestamp(), customFormat),
      }),
      new transports.File({
        level: 'error',
        filename: '../logs/error.log',
        format: combine(errorFilter(), timestamp(), customFormat),
      }),
    ],
  };
