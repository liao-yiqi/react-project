import axios from "axios";
import {REMOVE_TOKEN, GET_TOKEN,} from "@/utils/token.js";
import router from "@/router/index.jsx";
import {message} from "antd";

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

request.interceptors.request.use(config => {
    const token = GET_TOKEN()
    if (token) config.header.Authorization = `Bearer ${token}`
    return config

}, (error) => {
    return Promise.reject(error)
})

request.interceptors.response.use(response => {
    return response.data
}, (error) => {
    if (error.response.status === 401) {
        REMOVE_TOKEN()
        router.navigate('/login')
        window.location.reload()
    } else if (error.response.status === 400) {
        message.error(error.response.data.message)
    }
    return Promise.reject(error)
})

export {request}