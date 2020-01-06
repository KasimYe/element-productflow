const express=require('express')
const http=require('./http')

const hostName = '127.0.0.1'; //ip或域名
const port = 8080; //端口
const app = express();

app.use(require('cors')())
app.use(express.json())
require('./web')(app)

app.listen(port, hostName, function () {
    console.log(`弘瑞公众号微信消息服务器运行在http://${hostName}:${port}`);
});
