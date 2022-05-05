const mongoose = require('mongoose');
const validator = require('validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 2) {
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
        validate(value) {
            if (value.length < 10) {
                throw new Error('Mobile Number Must Be Of 10 digits');
            }
        }

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


    },
    complaintNumberr: {
        type: Number,
        default: 1
    }

}, {
    timestamps: true,
    indexedDB: true
});
userSchema.plugin(AutoIncrement, {inc_field: 'complaintNumberr'});
const userModel = mongoose.model('complaints', userSchema);


module.exports = userModel;