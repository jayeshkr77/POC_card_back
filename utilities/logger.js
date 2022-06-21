const winston = require('winston');

let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all: true
    }),
    winston.format.timestamp({
        format: "YY-MM-DD HH:MM:SS"
    }),
    winston.format.printf(
        info => `${info.timestamp} ${info.level} ${info.message}`
    )
);

let errorLogs = winston.format.combine(
    winston.format.colorize({
        all: true
    }),
    winston.format.timestamp({
        format: "YY-MM-DD HH:MM:SS"
    }),
    winston.format.printf(
        error => `${error.timestamp} ${error.message} ${error.level}`
    )
);

const logger = winston.createLogger({
    level: "debug",
    transports: [

    ],
});

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [],
// });

if (process.env.NODE_ENV !== 'production') {
    logger.add(new (winston.transports.Console)({
        format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
        , level: 'info'
    }));
    // logger.add(new (winston.transports.Console)({
    //     format: winston.format.combine(winston.format.colorize(), errorLogs)
    //     , level: 'error'
    // }));
} else {
    logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
    logger.add(new winston.transports.File({ filename: 'logs/combined.log' }));
}
module.exports = logger;