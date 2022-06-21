const logger = require('../utilities/logger');

const loggerMiddleware = (req, res, next) => {
    res.on('finish', function () {
        logger.info(`${res.statusCode} ${req.originalUrl} - ${req.method} - ${req.ip} - ${(Object.keys(req.headers).map(header => `${header}:${req.headers[header]}`)).join(', ').trim()} ${res.xres ? `- res: ${res.xres}}` : ''}`);
    });
    next();
}

const errorHandler = (err, req, res, next) => {
    logger.error(`${err.stack}`);
    err.occuredAt = new Date().toUTCString();
    res.status(err.status || 400).json({ "status": "error", "message": err.message, "error": err });
}
module.exports = { 
    loggerMiddleware, 
    errorHandler 
};
