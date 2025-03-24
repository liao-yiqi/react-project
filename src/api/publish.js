import {request} from "@/utils/request.js";

export const getChannelsAPI = () => {
    return request({
        url: '/channels',
        method: 'get'
    })
}

export const createArticleAPI = (data) => {
    return request({
        url: '/mp/articles?draft=false',
        method: 'post',
        data
    })
}