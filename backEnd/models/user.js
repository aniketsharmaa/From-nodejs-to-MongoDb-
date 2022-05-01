const { Db } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if ( value.length < 3 ) {
                throw new Error('Name Must Be More than 3 digits');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if ( !validator.isEmail(value) ) {
                throw new Error('Invalid Email');
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if ( value.length != 10 ) {
                throw new Error('Mobile Number Should be of 10 digits');
            }
        }
    }
}, {
    timestamps: true
} );

const userModel = mongoose.model('users', userSchema, 'user');

module.exports = userModel;