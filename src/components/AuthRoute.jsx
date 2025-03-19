import {GET_TOKEN} from "@/utils/token.js";
import {Navigate} from 'react-router-dom'

export function AuthRoute({children}) {
    const token = GET_TOKEN()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace/>
    }
}
