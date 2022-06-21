const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    resturantName: {
        type: String,
        required: true
    },
    resturantAddress: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    resturantPhoneNo: {
        type: String,
        required: true
    },
    onBoardDate: {
        type: Date,
    },
    password: {
        type: String,
    },
    passwordExpired: {
        type: Boolean,
    },
    lastLogin: {
        type: Date,
    },
    active:{
        type: Boolean,
        default: false
    },
    lastPasswordUpdate:{
        type: Date,
    },
    accountStatus:{
        type: String,
        enum: [
            "ACTIVATE_ACCOUNT"
        ]
    }
});

clientSchema.index({ email: 1 }, { unique: true });
const Client = mongoose.model('clients', clientSchema);

module.exports = Client;