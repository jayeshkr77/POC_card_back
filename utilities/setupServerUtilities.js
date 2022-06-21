const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const redis = require('redis');
const logger = require('./logger');
require("dotenv").config();

let MONGODB_URL = process.env.MONGODB_URL;
let SMTP_HOST = process.env.SMTP_HOST;
let SMTP_PORT = parseInt(process.env.SMTP_PORT);
let SMTP_EMAIL = process.env.SMTP_EMAIL;
let SMTP_PASSWORD = process.env.SMTP_PASSWORD;

function SetupServerUtilties() {
    this.redisClient;
    this.mailTransporter;
    this.sheetsClient;
    this.auth;
    this.timer;
    this.lastReq;

    //Mongoose configurations
    this.databaseConnection = async function () {
        try {
            const dbConnection = await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
            if (dbConnection) logger.info('✔️ Database Connected');
        } catch (err) {
            logger.error("❌ Unable to connect to the Database:\n", err.message);
            process.exit(1);
        }
    }

    //Email configurations
    this.smtpConnection = async function () {
        this.mailTransporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: SMTP_EMAIL,
                pass: SMTP_PASSWORD
            }
        });
        try {
            const smtpConnection = await this.mailTransporter.verify();
            if (smtpConnection) logger.info(`✔️ SMTP status ready`);
        } catch (err) {
            logger.error('❌ Error while connecting SMTP');
            logger.error(`${err.name} ${err.message}`);
        }
    }

    //Redis configurtion
    this.redisConnection = async function () {
        this.redisClient = redis.createClient();
        this.redisClient.on('ready', () => logger.info('✔️ Redis server connected'));
        this.redisClient.on('error', (err) => { logger.error('❌ Redis Client Error', err); process.exit(1); });
        //Attempt redis connection
        await this.redisClient.connect();
    }
}

let serverSetup = new SetupServerUtilties();
(async function(){
    await serverSetup.databaseConnection();
    await serverSetup.redisConnection();
    await serverSetup.smtpConnection();
})();
// serverSetup.smtpConnection();

module.exports = serverSetup;