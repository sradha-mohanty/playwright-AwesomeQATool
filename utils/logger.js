const winston = require("winston");
require('winston-daily-rotate-file');
let logLevel;
const winstonLogFormatForFile = winston.format.combine(
  winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.align(),
  winston.format.printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
 )
 const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: '%DATE%-app-log.log',
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '2d',
  zippedArchive: true,
  json: false,
  format: winstonLogFormatForFile
});
const logger = winston.createLogger({
  level: logLevel,
  transports: [
      fileRotateTransport,
      //consoleTransport
  ]
});
module.exports = logger;

