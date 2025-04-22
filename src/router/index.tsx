import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";

const Home = lazy(() => import('@/pages/Home/Home.tsx'))
const Detail = lazy(() => import('@/pages/Detail/Detail.tsx'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: 'detail',
        element: <Detail/>
    }
])

export default router