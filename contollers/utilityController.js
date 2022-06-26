const logger = require('../utilities/logger');
const Client = require("../modals/client");
const { validateNewClient } = require('../validators/clients');
const { validateEmail, validateOTP, validatePassword } = require('../validators/general');
const serverSetup = require('../utilities/setupServerUtilities');
const config = require('../config/config.json');

const registerController = async (req, res, next) => {
    try {
        validateNewClient(req.body);

        let clientInfo = { ...req.body };
        clientInfo.onBoardDate = new Date().toISOString();
        clientInfo.accountStatus = "PASSWORD_NOT_SET";

        const newClient = await Client.create(clientInfo);
        logger.info(`New client added. info: {email: ${newClient.email}, resturantName: ${newClient.resturantName}}`);
        res.json({ "status": "success", "message": "CLIENT_ADDED_SUCCESSFULLY", "data": { email: newClient.email, resturantName: newClient.resturantName } });
    } catch (err) {
        res.xres = JSON.stringify({ "status": "error", "message": err.message, "error": err });
        err.status = 400;
        next(err);
    }
}

const clientStatus = async (req, res, next) => {
    try {
        if (!validateEmail(req.body.email)) {
            throw new Error('EMAIL_INVALID');
        }
        const client = Client.findOne({ email: req.body.email });
        if (!client) {
            throw new Error(`EMAIL_INVALID`);
        }
        res.json({ "active": client.active, "message": client.accountStatus });
    } catch (err) {
        res.xres = JSON.stringify({ "status": "error", "message": err.message, "error": err });
        err.status = 400;
        next(err);
    }
}

const generateOTP = async (req, res, next) => {
    try {
        if (!validateEmail(req.body.email)) {
            throw new Error('EMAIL_INVALID');
        }
        const otp = Math.floor(Math.random() * 1000000);
        serverSetup.redisClient.set(req.body.email, otp, 'EX', config.redisExpiry);
        res.json({ "status": "success", "message": "OTP_SET_SUCCESSFULLY" });
    } catch (err) {
        res.xres = JSON.stringify({ "status": "error", "message": err.message, "error": err });
        err.status = 400;
        next(err);
    }
}

const updatePassword = async (req, res, next) => {
    try {
        if (!validateEmail(req.body.email)) {
            throw new Error('EMAIL_INVALID');
        }
        if (!validatePassword(req.body.password)) {
            throw new Error('PASSWORD_REQUIREMENT_UNMATCH');
        }
        if (!validateOTP(req.body.otp) || req.body.otp !== await serverSetup.redisClient.get(req.body.email)) {
            logger.error(`Password updated failed for ${req.body.email}`);
            throw new Error("OTP_INVALID");
        }
        //TODO: Need to hash the password
        const client = await Client.findOneAndUpdate(
            { email: req.body.email },
            { password: req.body.password, accountStatus: "ACTIVATE_ACCOUNT", lastPasswordUpdate: new Date().toISOString() },
            { fields: { "email": 1, "accountStatus": 1, "id": 0 }, new: true }
        );
        logger.info(`Password updated for ${req.body.email}`);
        res.json({ "status": "success", "message": "PASSWORD_UPDATED", "data": client });
    } catch (err) {
        res.xres = JSON.stringify({ "status": "error", "message": err.message, "error": err });
        err.status = 400;
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        if (!validateEmail(req.body.email)) {
            throw new Error('EMAIL_INVALID');
        }
        if (!validatePassword(req.body.password)) {
            throw new Error('PASSWORD_REQUIREMENT_UNMATCH');
        }
        const client = await Client.findOne({ email: req.body.email, password: req.body.password })
            .select({ email: 1, phoneNo: 1 })
            .exec();
        
        if(client){
            console.log(client);
        }else{
            throw new Error('INCORRECT_EMAIL_OR_PASSWORD');
        }
    } catch (err) {
        res.xres = JSON.stringify({ "status": "error", "message": err.message, "error": err });
        err.status = 400;
        next(err);
    }
}
module.exports = {
    registerController,
    clientStatus,
    updatePassword,
    generateOTP,
    login
}