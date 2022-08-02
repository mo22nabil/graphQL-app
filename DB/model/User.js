const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userScheam = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    coverPic: Array,
    confirmEmail: { type: Boolean, default: false },
    role: { type: String, default: 'User' },
}, {
    timestamps: true
})

userScheam.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

const userModel = mongoose.model('User', userScheam)
module.exports = userModel