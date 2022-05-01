const { Db } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 3) {
                throw new Error('Name Must Be More than 3 alphabets');
            }
        }
    },
    dob: {
        type: Date,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        // validate(value) {
        //     if (value.length != 10) {
        //         console.log(value);
        //         throw new Error('Number must be 10 digits', value.length);
        //     }
        // }

    },
    compSub: {
        type: String,
        required: true,
        trim: true,


    },
    comp: {
        type: String,
        required: true,
        trim: true,


    }
}, {
    timestamps: true
});

const userModel = mongoose.model('users', userSchema, 'user');

module.exports = userModel;