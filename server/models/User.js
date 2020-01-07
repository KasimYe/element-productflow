const mongoose = require('mongoose')

const schema = mongoose.Schema({
    subscribe: { type: Number },
    openid: { type: String },
    nickname: { type: String },
    sex: { type: Number },
    language: { type: String },
    city: { type: String },
    province: { type: String },
    country: { type: String },
    headimgurl: { type: String },
    subscribe_time: { type: Number },
    unionid: { type: String },
    remark: { type: String },
    groupid: { type: Number },
    tagid_list: { type: Array },
    subscribe_scene: { type: String },
    qr_scene: { type: Number },
    qr_scene_str: { type: String },
    remarkname: { type: String }
})

module.exports=mongoose.model('User',schema)