import {useEffect, useState} from "react";
import {ChannelItem} from "@/types/channel";
import {getChannelAPI} from "@/apis/channel.ts";

export function useTabs() {
    const [channelsList, setChannelsList] = useState<ChannelItem[]>([])
    useEffect(() => {
        const getChannelData = async () => {
            const {data} = await getChannelAPI()
            setChannelsList(data.channels)
        }
        getChannelData().then()
    }, []);
    return {channelsList}
}