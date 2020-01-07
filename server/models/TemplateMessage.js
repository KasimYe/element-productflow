const mongoose = require('mongoose')

const schema = mongoose.Schema({
    touser: { type: String },
    template_id: { type: String },
    url: { type: String },
    miniprogram: {
        appid: { type: String },
        pagepath: { type: String }
    },
    data: {
        first: {
            value: { type: String },
            color: { type: String }
        },
        keyword1: {
            value: { type: String },
            color: { type: String }
        },
        keyword2: {
            value: { type: String },
            color: { type: String }
        },
        keyword3: {
            value: { type: String },
            color: { type: String }
        },
        remark: {
            value: { type: String },
            color: { type: String }
        }
    }
})

module.exports = mongoose.model('TemplateMessage', schema)