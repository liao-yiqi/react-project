import request from "@/utils/request";
import {Toast} from "antd-mobile";

const {createSlice} = require("@reduxjs/toolkit");

const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, {payload}) {
            state.billList = payload;
        },
        addBill(state, {payload}) {
            state.billList.push(payload);
        }
    }
})

const {setBillList, addBill} = billStore.actions

const getBillList = () => {
    return async (dispatch) => {
        const {data} = await request.get('/bill')
        dispatch(setBillList(data))
    }
}

const addBillList = (data) => {
    return async (dispatch) => {
        const res = await request.post('/bill', data)
        dispatch(addBill(res.data))
        Toast.show({
            icon: 'success',
            content: '保存成功'
        })
    }
}
export {getBillList, addBillList}
export default billStore.reducer