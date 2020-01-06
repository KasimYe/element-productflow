module.exports = app => {
    const express = require('express')
    const http = require('../http')
    const router = express.Router()

    const config = {
        token: 'test', //对应测试号接口配置信息里填的token
        appid: 'wx161e2dc4145a7605', //对应测试号信息里的appID
        secret: '621eabda4c24eada9417370b35fad7ed', //对应测试号信息里的appsecret
        grant_type: 'client_credential' //默认
    };

    async function getToken() {
        const res = await http.get(`token?grant_type=${config.grant_type}&appid=${config.appid}&secret=${config.secret}`)
        return res.data
    }

    router.get('/userlist', async (request, response) => {
        const access = await getToken()
        if (access.access_token) {
            const res = await http.get(`user/get?access_token=${access.access_token}&next_openid=`)
            response.send(res.data.data.openid)
        } else {
            response.send(access)
        }

    })

    router.get('/userinfo/:id', async (request, response) => {
        const openid = request.params.id;
        const access = await getToken()
        if (access.access_token) {
            const res = await http.get(`user/info?access_token=${access.access_token}&openid=${openid}&lang=zh_CN`)
            response.send(res.data);
        } else {
            response.send(access)
        }
    })

    router.post('/tempmsg', async (request, response) => {
        const access = await getToken()
        if (access.access_token) {
            const res = await http.post(`message/template/send?access_token=${access.access_token}`, request.body)
            response.send(res.data);
        } else {
            response.send(access)
        }
    })


    app.use('/api', router)
}