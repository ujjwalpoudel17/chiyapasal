const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6 
    },
    role:{
        type: String,
        enum: ["admin","reception","waiter"],
        default: "waiter"
    },
isActive:{
    type: Boolean,
    default: true
}
},
{timestamps: true}
);

//Hashing the password






module.exports = mongoose.model('User', userSchema);