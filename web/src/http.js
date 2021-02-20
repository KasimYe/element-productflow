import axios from 'axios';

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/api'
    //baseURL: 'http://192.168.102.10:5658/api',
});

http.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token; // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);


export default http;
