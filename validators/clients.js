const {validateEmail, validatePhoneNo} = require('./general');

const validateNewClient = newClient => {
    if(!validateEmail(newClient.email)){
        throw new Error("EMAIL_INVAILD");
    }
    if(!validatePhoneNo(newClient.phoneNo)){
        throw new Error("PHONE_NO_INVALID");
    }
    if(!validatePhoneNo(newClient.resturantPhoneNo)){
        throw new Error("PHONE_NO_INVALID");
    }
}

module.exports = {
    validateNewClient
}