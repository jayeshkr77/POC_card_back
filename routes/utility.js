const express = require('express');
const { 
    registerController, 
    clientStatus, 
    generateOTP, 
    updatePassword, 
    loginController,
    dashboardController
} = require('../contollers/utilityController');
const authentication = require('../middlewares/authentication');
const router = express.Router();

// /api/utility
router.post('/register',registerController);
router.post('/status', clientStatus);
router.post('/otp', generateOTP);
router.post('/updatePassword', updatePassword);
router.post('/login', loginController);
router.get('/dashboard', authentication, dashboardController);

module.exports = router;