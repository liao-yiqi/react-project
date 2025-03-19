import {configureStore} from '@reduxjs/toolkit'
import userReducer from "@/store/modules/user.js";

export default configureStore({
    reducer: {
        user: userReducer
    }
})