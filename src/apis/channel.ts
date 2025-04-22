import {request} from "@/utils/request.ts";
import {ChannelDetailResult, ChannelListResult, ChannelResult} from "@/types/channel";

export const getChannelAPI = () => {
    return request<ChannelResult>({
        url: '/channels',
        method: 'GET'
    })
}

export const getHomeListAPI = (data: { channel_id: string, timestamp: string }) => {
    return request<ChannelListResult>({
        url: '/articles',
        method: 'GET',
        params: data
    })
}

export const getArticleDetailAPI = (id: string) => {
    return request<ChannelDetailResult>({
        url: `/articles/${id}`,
        method: 'GET'
    })
}