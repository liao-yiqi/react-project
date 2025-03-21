import {request} from "@/utils/request.js";

export const login = (data) => {
    return request({
        url: '/authorizations',
        method: 'post',
        data
    })
}

export const getProfile = () => {
    return request({
        url: '/user/profile',
        method: 'GET'
    })
}