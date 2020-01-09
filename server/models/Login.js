const mongoose = require('mongoose')

const schema = mongoose.Schema({
    loginid: { type: String, unique: true },
    password: {
        type: String,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('Login', schema)