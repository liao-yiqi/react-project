import axios from "axios";

const {createSlice} = require("@reduxjs/toolkit");

const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, {payload}) {
            state.billList = payload;
        }
    }
})

const {setBillList} = billStore.actions

const getBillList = () => {
    return async (dispatch) => {
        const url = 'http://127.0.0.1:4523/m1/5893826-5580607-default/getMockData'
        const res = await axios.get(url)
        dispatch(setBillList(res.data.data))
    }
}
export {getBillList}
export default billStore.reducer