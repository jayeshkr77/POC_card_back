const express = require('express');
const { 
    registerController, 
    clientStatus, 
    generateOTP, 
    updatePassword 
} = require('../contollers/utilityController');
const router = express.Router();

// const Coupon = require('../modals/coupon');
// const couponController = require('../controllers/couponController')

// /api/utility
router.post('/register',registerController);
router.post('/status', clientStatus);
router.post('/otp', generateOTP);
router.post('/updatePassword', updatePassword);

module.exports = router;