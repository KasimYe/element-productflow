module.exports = app => {
    const express = require('express');
    const http = require('../http');
    const jwt = require('jsonwebtoken');
    const router = express.Router();

    const User = require('../models/User');
    const TemplateMessage = require('../models/TemplateMessage');
    const Login = require('../models/Login');

    const config = {
        token: process.env.WX_TOKEN, //对应测试号接口配置信息里填的token
        appid: process.env.WX_APPID, //对应测试号信息里的appID
        secret: process.env.WX_SECRET, //对应测试号信息里的appsecret
        grant_type: process.env.WX_GRANT_TYPE, //默认
    };

    const auth = async (req, res, next) => {
        const raw = String(req.headers.authorization).split(' ').pop();
        const { id } = jwt.verify(raw, process.env.API_SECRET);
        req.login = await Login.findById(id);
        next();
    };

    async function getToken() {
        const res = await http.get(
            `token?grant_type=${config.grant_type}&appid=${config.appid}&secret=${config.secret}`
        );
        return res.data;
    }

    router.get('/openidlist', auth, async (request, response) => {
        const access = await getToken();
        if (access.access_token) {
            const res = await http.get(`user/get?access_token=${access.access_token}&next_openid=`);
            const opidarr = res.data.data.openid;
            const oplist = opidarr.map(v => {
                return { openid: v };
            });
            response.send(oplist);
        } else {
            response.send(access);
        }
    });

    router.get('/userinfo/:id', auth, async (request, response) => {
        const openid = request.params.id;
        const access = await getToken();
        if (access.access_token) {
            const res = await http.get(
                `user/info?access_token=${access.access_token}&openid=${openid}&lang=zh_CN`
            );
            let model = await User.findOne({ openid: openid });
            if (model) {
                await model.save(res.data);
            } else {
                model = await User.create(res.data);
            }
            response.send(model);
        } else {
            response.send(access);
        }
    });

    router.get('/users', async (request, response) => {
        await User.find((err, users) => {
            if (err) return console.error(err);
            response.send(users);
        });
    });

    router.get('/users/:id', auth, async (request, response) => {
        const model = await User.findById(request.params.id);
        response.send(model);
    });

    router.get('/users/openid/:id', auth, async (request, response) => {
        const model = await User.findOne({ openid: request.params.id });
        response.send(model);
    });

    router.put('/users/:id', async (request, response) => {
        const model = await User.findByIdAndUpdate(request.params.id, request.body);
        response.send(model);
    });

    router.delete('/users/:id', auth, async (request, response) => {
        await User.remove({ _id: request.params.id }, (err, user) => {
            if (err) return console.error(err);
            response.send(user);
        });
    });

    router.get('/messages', auth, async (request, response) => {
        await TemplateMessage.find((err, messages) => {
            if (err) return console.error(err);
            response.send(messages);
        }).limit(100);
    });

    router.get('/templist', auth, async (request, response) => {
        const access = await getToken();
        if (access.access_token) {
            const res = await http.get(
                `template/get_all_private_template?access_token=${access.access_token}`
            );
            response.send(res.data.template_list);
        } else {
            response.send(access);
        }
    });

    router.post('/tempmsg', auth, async (request, response) => {
        const access = await getToken();
        if (access.access_token) {
            const model = await TemplateMessage.create(request.body);
            const res = await http.post(
                `message/template/send?access_token=${access.access_token}`,
                model
            );
            response.send(res.data);
        } else {
            response.send(access);
        }
    });

    router.post('/register', auth, async (request, response) => {
        let model = await Login.findOne({ loginid: request.body.loginid });
        if (model) {
            model = await Login.findByIdAndUpdate(model._id, request.body);
        } else {
            model = await Login.create(request.body);
        }
        response.send(model);
    });

    router.post('/loginin', async (request, response) => {
        const model = await Login.findOne({ loginid: request.body.loginid });
        if (!model) {
            return response.status(422).send({
                message: '用户名不存在',
            });
        }
        const isPasswordValid = require('bcryptjs').compareSync(
            request.body.password,
            model.password
        );
        if (!isPasswordValid) {
            return response.status(422).send({
                message: '密码错误',
            });
        }

        const token = jwt.sign(String(model._id), process.env.API_SECRET);
        response.send({ user: model, token });
    });

    app.use('/api', router);
};
