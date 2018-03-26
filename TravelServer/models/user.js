const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema
const UserSchema = new Schema({
        email: {
            type: String,
            required: false
        },
        username: { 
            type: String, 
            required: true 
        },
        encryptedPassword: {
            type: String,
            required: true
        },
        facebookID: String,
        googleID: String
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;