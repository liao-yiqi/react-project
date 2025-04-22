import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

// 响应拦截器
instance.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        return Promise.reject(error);
    }
)

type Data<T> = {
    message: string
    data: T
}

const request = async <T>(config: AxiosRequestConfig): Promise<Data<T>> => {
    const res: AxiosResponse<Data<T>> = await instance(config)
    return res.data
}
export {request}