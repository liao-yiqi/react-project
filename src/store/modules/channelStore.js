import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
    name: "channels",
    initialState: {
        channelList: []
    },
    reducers: {
        setChannels(state, {payload}) {
            state.channelList = payload
        }
    }
})
const {setChannels} = channelStore.actions
const fetchChannels = () => {
    return async (dispatch) => {
        const res = await axios.get('http://geek.itheima.net/v1_0/channels')
        dispatch(setChannels(res.data.data.channels))
    }
}
export {fetchChannels, setChannels}
const reducer = channelStore.reducer
export default reducer
