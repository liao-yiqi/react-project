import './home.scss'
import {Tabs} from "antd-mobile";
import {useTabs} from '@/hooks/useTabs.ts'
import {HomeList} from "@/pages/Home/components/HomeList.tsx";
import {useState} from "react";

const Home = () => {
    const {channelsList} = useTabs();
    const [activeKey, setActiveKey] = useState<string>('0');
    return (
        <div className='tabContainer'>
            <Tabs activeKey={activeKey} onChange={(e) => setActiveKey(String(e))}>
                {channelsList.map(item => (
                    <Tabs.Tab title={item.name} key={item.id}>
                        <div className='listContainer'>
                            <HomeList channelId={item.id.toString()}/>
                        </div>
                    </Tabs.Tab>
                ))}
            </Tabs>
        </div>
    )
}
export default Home