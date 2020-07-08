const express=require('express')
const http=require('./http')
require('dotenv').config();

const hostName =process.env.API_HOST  //ip或域名
const port = process.env.API_PORT //端口
const app = express();

app.use(require('cors')())
app.use(express.json())
app.use('/admin',express.static(__dirname+'/admin'))


require('./plugins/db')(app)
require('./web')(app)

app.listen(port, hostName, function () {
    console.log(`春宇公众号微信消息服务器运行在http://${hostName}:${port}`);
});
