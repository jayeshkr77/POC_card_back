const { validateEmail, validatePassword, validatePhoneNo, validateOTP } = require('./general');

test('Validating email', () => {
    expect(validateEmail('jayeshkr@gmail.com')).toBeTruthy();
    expect(validateEmail('jayeshkrgmail.com')).toBeFalsy();
});

test('Validating password', () => {
    expect(validatePassword('abc@123')).toBeTruthy();
    expect(validatePassword('abc@')).toBeFalsy();
    expect(validatePassword('abc@1234567')).toBeFalsy();
});

test('Validating otp', () => {
    expect(validateOTP('343434')).toBeTruthy();
    expect(validateOTP('3434345')).toBeFalsy();
    expect(validateOTP('34343A')).toBeFalsy();
});

test('Validating phone numbers', () => {
    expect(validatePhoneNo('919567434545')).toBeTruthy();
    expect(validatePhoneNo('9195674345454')).toBeTruthy();
    expect(validatePhoneNo('91956743454545')).toBeFalsy();
    expect(validatePhoneNo('91956743454')).toBeFalsy();
    expect(validatePhoneNo('91956743454A')).toBeFalsy();
});