import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name: "foods",
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: []
    },
    reducers: {
        setFoodsList(state, {payload}) {
            state.foodsList = payload;
        },

        changeActiveIndex(state, {payload}) {
            state.activeIndex = payload;
        },

        addCart(state, {payload}) {
            const item = state.foodsList.find(item => item.id === payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push(payload)
            }
        },

        increaseCount(state, {payload}) {
            const item = state.cartList.find(item => item.id === payload)
            item.count++
        },

        decreaseCount(state, {payload}) {
            const item = state.cartList.find(item => item.id === payload)
            if (item.count === 1) {
                state.cartList = state.cartList.filter(item => item.id !== payload);
            } else {
                item.count--
            }
        },

        clearCart(state, {payload}) {
            state.cartList = []
        }
    }
})
export const {
    setFoodsList,
    changeActiveIndex,
    addCart,
    increaseCount,
    decreaseCount,
    clearCart
} = foodsStore.actions;
const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8888/takeaway')
        dispatch(setFoodsList(res.data))
    }
}
export {fetchFoodsList}
export default foodsStore.reducer