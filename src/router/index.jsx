import {createBrowserRouter} from 'react-router-dom'
import {lazy} from "react";
import {AuthRoute} from "@/components/AuthRoute.jsx";

const Layout = lazy(() => import('@/pages/Layout/layout.jsx'))
const Login = lazy(() => import('@/pages/Login/login.jsx'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute>
            <Layout/>
        </AuthRoute>
    },
    {
        path: '/login',
        element: <Login/>
    }
])

export default router