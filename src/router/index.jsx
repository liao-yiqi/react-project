import {createBrowserRouter} from 'react-router-dom'
import {lazy} from "react";
import {AuthRoute} from "@/components/AuthRoute.jsx";

const Layout = lazy(() => import('@/pages/Layout/layout.jsx'))
const Login = lazy(() => import('@/pages/Login/login.jsx'))
const Home = lazy(() => import('@/pages/Home/home.jsx'))
const Article = lazy(() => import('@/pages/Article/article.jsx'))
const Publish = lazy(() => import('@/pages/Publish/publish.jsx'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute>
            <Layout/>
        </AuthRoute>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'article',
                element: <Article/>,
            },
            {
                path: 'publish',
                element: <Publish/>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login/>
    }
])

export default router