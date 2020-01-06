const axios = require('axios'); 

const http=axios.create({
    baseURL:'https://api.weixin.qq.com/cgi-bin'
})

module.exports= http