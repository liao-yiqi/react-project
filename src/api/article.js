import {request} from "@/utils/request.js";

export const getArticleListAPI = (params) => {
    return request({
        url: '/mp/articles',
        method: 'get',
        params
    })
}

export const delArticleAPI = (id) => {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

export const getArticleById = (id) => {
    return request({
        url: `/mp/articles/${id}`,
        method: 'get'
    })
}

export const updateArticleAPI = (data) => {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}