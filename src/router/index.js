import {createBrowserRouter} from "react-router-dom";
import Layout from "@/pages/Layout/layout";
import Month from "@/pages/Month/month";
import Year from "@/pages/Year/year";
import New from "@/pages/New/new";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Month/>,
            },
            {
                path: 'year',
                element: <Year/>,
            }
        ]
    },
    {
        path: '/new',
        element: <New/>,
    }
])

export default router
