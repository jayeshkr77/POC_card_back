const express = require('express');
const configRouter = require('./config');
const utilityRouter = require('./utility');

const app = express();

app.use('/config/',configRouter)
app.use('/utility/',utilityRouter)

module.exports = app;