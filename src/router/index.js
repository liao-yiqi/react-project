import {createBrowserRouter} from "react-router-dom";
import Layout from "@/pages/Layout/layout";
import Month from "@/pages/Month/month";
import Year from "@/pages/Year/year";
import KeepAccount from "@/pages/KeepAccount/keepAccount";

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
        element: <KeepAccount/>,
    }
])

export default router
