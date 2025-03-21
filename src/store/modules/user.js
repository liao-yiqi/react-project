import {createSlice} from '@reduxjs/toolkit'
import {getProfile, login} from '@/api/user.js'
import {GET_TOKEN, REMOVE_TOKEN, SET_TOKEN} from "@/utils/token.js";
import {useNavigate} from "react-router-dom";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: GET_TOKEN() || '',
        userInfo: {}
    },
    reducers: {
        setToken: (state, {payload}) => {
            state.token = payload
            SET_TOKEN(payload)
        },
        logout: (state) => {
            state.token = ''
            REMOVE_TOKEN()
        },
        setUserInfo(state, {payload}) {
            state.userInfo = payload
        }
    }
})

const userReducer = userStore.reducer
const {setToken, logout, setUserInfo} = userStore.actions

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const {data} = await login(loginForm)
        dispatch(setToken(data.token))
    }
}
const fetchUserInfo = () => {
    return async (dispatch) => {
        const {data} = await getProfile()
        dispatch(setUserInfo(data))
    }
}

export {setToken, fetchLogin, logout, fetchUserInfo}
export default userReducer