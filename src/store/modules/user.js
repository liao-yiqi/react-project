import {createSlice} from '@reduxjs/toolkit'
import {login} from '@/api/user.js'
import {GET_TOKEN, SET_TOKEN} from "@/utils/token.js";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: GET_TOKEN() || ''
    },
    reducers: {
        setToken: (state, {payload}) => {
            state.token = payload
            SET_TOKEN(payload)
        }
    }
})

const userReducer = userStore.reducer
const {setToken} = userStore.actions
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const {data} = await login(loginForm)
        dispatch(setToken(data.token))
    }
}
export {setToken, fetchLogin}
export default userReducer