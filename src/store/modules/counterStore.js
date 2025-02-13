import {createSlice} from '@reduxjs/toolkit'

const counterStore = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        addition(state, {payload}) {
            if (payload) state.count += payload
            state.count++
        },
        decrement(state) {
            if (state.count <= 0) return alert('已到达最小数')
            state.count--
        }
    }
})
const {addition, decrement} = counterStore.actions

export {addition, decrement}

const reducer = counterStore.reducer

export default reducer