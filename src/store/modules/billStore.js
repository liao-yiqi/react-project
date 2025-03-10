import request from "@/utils/request";

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
        const res = await request.get('getMockData')
        dispatch(setBillList(res.data.data))
    }
}
export {getBillList}
export default billStore.reducer