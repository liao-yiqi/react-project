import axios from 'axios'

const request = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/5893826-5580607-default',
})

export default request