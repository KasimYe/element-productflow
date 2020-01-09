const mongoose = require('mongoose')

const schema = mongoose.Schema({
    loginid: { type: String },
    password: { type: String }
})

module.exports = mongoose.model('Login', schema)