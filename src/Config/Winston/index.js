import winston from 'winston'

import DefaultAppConfig from '../../../DefaultAppConfig'


const config = DefaultAppConfig()

const WinstonInstance = new winston.Logger({
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            json: true,
            colorize: true,
        }),
        new winston.transports.File({
            filename: `./logs/services/API/RawHttpDataLog.json`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
})

WinstonInstance.stream = {
  write: (message, encoding) => {
    WinstonInstance.info(message)
  }
}


export default WinstonInstance
