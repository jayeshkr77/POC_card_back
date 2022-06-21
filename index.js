const express = require("express");
var cors = require("cors");

var apiRouter = require("./routes/api");
const serverSetup = require("./utilities/setupServerUtilities");
const logger = require('./utilities/logger');
const { loggerMiddleware, errorHandler } = require('./middlewares/logger');

require("dotenv").config();

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Works')
})

app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", (req, res) => {
    return res.status(404).json({ "message": "Url not found." });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    logger.info(`This is a ${process.env.NODE_ENV} server.`)
    logger.info(`Server has started ${process.env.SERVER_URL}:${process.env.PORT}`);
});