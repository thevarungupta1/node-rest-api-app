const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'name is required']
    },
    lastName: {
        type: String      
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    mobile: {
        type: String                
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);