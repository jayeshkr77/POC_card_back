const logger = require('../utilities/logger');
const backendConfig = require('../config/config.json');

const loggerMiddleware = (req, res, next) => {
    res.on('finish', function () {
        logger.info(`${res.statusCode} ${req.originalUrl} - ${req.method} - ${req.ip} - ${(Object.keys(req.headers).map(header => `${header}:${req.headers[header]}`)).join(', ').trim()} ${res.xres ? `- res: ${res.xres}}` : ''}`);
    });
    next();
}

const errorHandler = (err, req, res, next) => {
    logger.error(`${err.stack}`);
    err.occuredAt = new Date().toUTCString();
    res.status(err.status || backendConfig.defaultError.statusCode).json({ "status": "error", "message": err.message || backendConfig.defaultError.message, "error": err });
}
module.exports = { 
    loggerMiddleware, 
    errorHandler 
};
