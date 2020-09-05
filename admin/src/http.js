import axios from 'axios'
import Vue from 'vue'
import router from './router/router.js'
const http = axios.create({
    baseURL: 'http://127.0.0.1:3000/admin/api'
})

http.interceptors.request.use(config=>{
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    return config;
})

http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
        if (err.response.data.message === '请先登录') {
            router.push('/login')
        }
    }

    return Promise.reject(err)
})
export default http;