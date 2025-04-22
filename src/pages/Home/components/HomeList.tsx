import {useEffect, useState} from "react";
import {ChannelListResult} from "@/types/channel";
import {getHomeListAPI} from "@/apis/channel.ts";
import {Image, InfiniteScroll, List} from "antd-mobile";
import {useNavigate} from "react-router-dom";

type Props = {
    channelId: string
}
export const HomeList = (props: Props) => {
    const [homeList, setHomeList] = useState<ChannelListResult>({
        results: [],
        pre_timestamp: String(new Date().getTime()),
    })
    useEffect(() => {
        const getHomeListData = async () => {
            const {data} = await getHomeListAPI({
                channel_id: props.channelId,
                timestamp: '' + new Date().getTime()
            })
            setHomeList({
                results: data.results,
                pre_timestamp: data.pre_timestamp
            })
        }
        getHomeListData().then()
    }, [props.channelId])
    const [hasMore, setHasMore] = useState(true)
    const getMore = async () => {
        const {data} = await getHomeListAPI({
            channel_id: props.channelId,
            timestamp: homeList.pre_timestamp
        })
        setHomeList({
            results: [...homeList!.results, ...data.results],
            pre_timestamp: data.pre_timestamp
        })
        if (data.results.length === 0) setHasMore(false)
    }

    const navigate = useNavigate()
    const onGoDetail = (id: string) => {
        navigate(`/detail?id=${id}`)
    }

    return (
        <div>
            <List>
                {homeList?.results.map(item => (
                    <List.Item description={item.pubdate}
                               prefix={
                                   <Image src={item.cover.images?.[0]}
                                          style={{borderRadius: 20}}
                                          fit="cover"
                                          width={40}
                                          height={40}
                                   />
                               }
                               key={item.art_id}
                               onClick={() => onGoDetail(item.art_id)}
                    >
                        {item.title}
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={getMore} hasMore={hasMore} threshold={10}/>
        </div>
    )
};