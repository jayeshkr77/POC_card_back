const express = require('express');
const router = express.Router();

// /api/config
router.get('/:resturantName/text/:lang',(req,res)=>{
    let json = require(`../config/text/${req.params.resturantName}_${req.params.lang}_text.json`);
    res.json(json);
});
router.get('/:resturantName/params/',(req,res)=>{
    let json = require(`../config/parameters/${req.params.resturantName}_params.json`);
    res.json(json);
});

module.exports = router;