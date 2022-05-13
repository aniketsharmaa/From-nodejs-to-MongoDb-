const mongoose = require('mongoose');
const validator = require('validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const registeredSchema = new mongoose.Schema({

    userNumber: {
        type: Number,
        default: 1
    },
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
    password:{
        type:String,
        required:true,
        validate(value) {
            if (value<2) {
                throw new Error('Invalid Password');
            }
        }
    }
 
 

}, {
    timestamps: true,
    indexedDB: true
});
registeredSchema.plugin(AutoIncrement, {inc_field: 'userNumber'});
const registeredModel = mongoose.model('Registerd Users', registeredSchema);


module.exports = registeredModel;