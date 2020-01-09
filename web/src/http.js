import axios from "axios"

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/api'
    //baseURL:'http://192.168.116.200:5658/api'
})

export default http