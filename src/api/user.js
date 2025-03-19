import {request} from "@/utils/request.js";

export const login = (data) => {
    return request({
        url: '/authorizations',
        method: 'post',
        data
    })
}