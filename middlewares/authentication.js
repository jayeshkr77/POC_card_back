const jwt = require('jsonwebtoken');
const Client = require('../modals/client');

const authentication = async (req, res, next) => {
    try{
        if (req.headers.authorization) {
            let decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
            const client = await Client.findOne({ email: decoded.email, phoneNo: decoded.phoneNo })
                .select({ email: 1, phoneNo: 1 })
                .exec();
            if(client){
                next();
            }else{
                throw new Error("INVALID_TOKEN");
            }
        }else{
            throw new Error("MISSING_AUTHORIZATION_HEADER");
        }
    } catch (err) {
        res.xres = JSON.stringify({ "status": "error", "message": err.message, "error": err });
        err.status = 400;
        next(err);
    }
}
module.exports = authentication;