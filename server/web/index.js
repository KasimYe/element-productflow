module.exports = app => {
    const express = require('express')
    const http = require('../http')
    const router = express.Router()

    const User = require('../models/User')
    const TemplateMessage = require('../models/TemplateMessage')
    const Login = require('../models/Login')

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

    router.get('/openidlist', async (request, response) => {
        const access = await getToken()
        if (access.access_token) {
            const res = await http.get(`user/get?access_token=${access.access_token}&next_openid=`)
            const opidarr = res.data.data.openid;
            const oplist = opidarr.map(v => {
                return { openid: v }
            })
            response.send(oplist)
        } else {
            response.send(access)
        }

    })

    router.get('/userinfo/:id', async (request, response) => {
        const openid = request.params.id;
        const access = await getToken()
        if (access.access_token) {
            const res = await http.get(`user/info?access_token=${access.access_token}&openid=${openid}&lang=zh_CN`)
            let model = await User.findOne({ openid: openid })
            if (model) {
                await model.save(res.data)
            } else {
                model = await User.create(res.data)
            }
            response.send(model)
        } else {
            response.send(access)
        }
    })

    router.get('/users', async (request, response) => {
        await User.find((err, users) => {
            if (err) return console.error(err);
            response.send(users);
        })
    })

    router.get('/users/:id', async (request, response) => {
        const model = await User.findById(request.params.id)
        response.send(model)
    })

    router.get('/users/openid/:id', async (request, response) => {
        const model = await User.findOne({ openid: request.params.id })
        response.send(model)
    })

    router.put('/users/:id', async (request, response) => {
        const model = await User.findByIdAndUpdate(request.params.id, request.body)
        response.send(model)
    })

    router.delete('/users/:id', async (request, response) => {
        await User.remove({ _id: request.params.id }, (err, user) => {
            if (err) return console.error(err);
            response.send(user);
        })
    })

    router.get('/messages', async (request, response) => {
        await TemplateMessage.find((err, messages) => {
            if (err) return console.error(err);
            response.send(messages);
        })
    })

    router.get('/templist', async (request, response) => {
        const access = await getToken()
        if (access.access_token) {
            const res = await http.get(`template/get_all_private_template?access_token=${access.access_token}`)
            response.send(res.data.template_list)
        } else {
            response.send(access)
        }
    })

    router.post('/tempmsg', async (request, response) => {
        const access = await getToken()
        if (access.access_token) {
            const model = await TemplateMessage.create(request.body)
            const res = await http.post(`message/template/send?access_token=${access.access_token}`, model)
            response.send(res.data);
        } else {
            response.send(access)
        }
    })

    router.post('/login', async (request, response) => {
        let model = await Login.findOne({ loginid: request.body.loginid })
        if (model) {
            model = await Login.findByIdAndUpdate(model._id, request.body)
        } else {
            model = await Login.create(request.body)
        }
        response.send(model);
    })

    router.post('/loginin', async (request, response) => {
        const model = await Login.findOne({ loginid: request.body.loginid, password: request.body.password })
        response.send(model)
    })

    app.use('/api', router)
}