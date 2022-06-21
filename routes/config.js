const express = require('express');
const router = express.Router();

// const Coupon = require('../modals/coupon');
// const couponController = require('../controllers/couponController')

// /api/config

router.get('/:resturantName/text/:lang',(req,res)=>{
    let json = require(`../config/text/${req.params.resturantName}_${req.params.lang}_text.json`);
    res.json(json);
});
router.get('/:resturantName/params/',(req,res)=>{
    let json = require(`../config/parameters/${req.params.resturantName}_params.json`);
    res.json(json);
});
// router.post('/',couponController.couponCreate);
// router.get('/:couponCode',couponController.couponValidate);
// router.post('/Apply', couponController.couponApply);

module.exports = router;