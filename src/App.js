import {useSelector, useDispatch} from "react-redux";
import {addition, decrement} from "./store/modules/counterStore";
import {useEffect} from "react";
import {fetchChannels, setChannels} from "./store/modules/channelStore";

function App() {
    const {count} = useSelector((state) => state.counter)
    const dispatch = useDispatch()
    const {channelList} = useSelector(state => state.channel)
    const params = '传值'
    useEffect(() => {
        dispatch(fetchChannels())
    }, [dispatch]);
    return (
        <div>
            <button onClick={() => dispatch(decrement())}>-</button>
            {count}
            <button onClick={() => dispatch(addition())}>+</button>
            <button onClick={() => dispatch(setChannels([]))}>清空</button>
            <button onClick={() => dispatch(fetchChannels())}>获取</button>
            <ul>
                {channelList.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default App
