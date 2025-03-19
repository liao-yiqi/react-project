import {createSlice} from '@reduxjs/toolkit'
import {login} from '@/api/user.js'

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    reducers: {
        setToken: (state, {payload}) => {
            state.token = payload
        }
    }
})

const userReducer = userStore.reducer
const {setToken} = userStore.actions
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const {data} = await login(loginForm)
        dispatch(setToken(data))
    }
}
export {setToken, fetchLogin}
export default userReducer