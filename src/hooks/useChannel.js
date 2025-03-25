import {useEffect, useState} from "react";
import {getChannelsAPI} from "@/api/publish.js";

const useChannel = () => {
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        async function getChannelData() {
            const {data} = await getChannelsAPI()
            setChannelList(data.channels)
        }

        getChannelData()
    }, [])
    return {channelList}
}
export {useChannel}