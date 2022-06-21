const validateEmail = email => {
    return email && String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
const validatePhoneNo = phoneNo => {
    return phoneNo && phoneNo.match(/^\d{12,13}$/);
}

const validateOTP = otp => {
    return otp && otp.match(/^\d{6}$/);
}

const validatePassword = password => {
    return password && password.match(/^[A-z,a-z,0-9,\/,!,@,#,$,%,^,&,*,(,)]{5,10}$/gm);
}

module.exports = {
    validateEmail,
    validatePhoneNo,
    validateOTP,
    validatePassword
}