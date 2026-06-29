const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    verificationToken: {
        type: String,
    },
    verificationTokenExpires: {
        type: Date,
    },
})

module.exports = mongoose.model("users", userSchema);