import {request} from "@/utils/request.js";

export const getArticleListAPI = (params) => {
    return request({
        url: '/mp/articles',
        method: 'get',
        params
    })
}