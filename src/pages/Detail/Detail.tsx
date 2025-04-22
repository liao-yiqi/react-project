import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getArticleDetailAPI} from "@/apis/channel.ts";
import {ChannelDetailResult} from "@/types/channel";
import {NavBar} from "antd-mobile";

const Detail = () => {
    const [params] = useSearchParams()
    const id = params.get('id')
    const [detailData, setDetailData] = useState<ChannelDetailResult | null>(null)
    useEffect(() => {
        const getArticleData = async () => {
            const {data} = await getArticleDetailAPI(id!)
            setDetailData(data)
        }
        getArticleData().then()
    }, [id]);
    const navigate = useNavigate()
    const back = () => {
        navigate(-1)
    }
    return (
        <div>
            <NavBar onBack={back}>
                {detailData?.title}
            </NavBar>
            <div dangerouslySetInnerHTML={{
                __html: detailData?.content ?? 'this is loading...'
            }}>
            </div>
        </div>
    )
}
export default Detail