import {createBrowserRouter} from 'react-router-dom'
import {lazy, Suspense} from "react";

const Layout = lazy(() => import('@/pages/Layout/layout.jsx'))
const Login = lazy(() => import('@/pages/Login/login.jsx'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>
    },
    {
        path: '/login',
        element: <Login/>
    }
])

export default router