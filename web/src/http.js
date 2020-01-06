import axios from "axios"

const http=axios.create({
    baseURL:'https://api.weixin.qq.com/cgi-bin'
})

export default http