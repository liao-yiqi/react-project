import {createBrowserRouter} from "react-router-dom";
import Login from "../page/Login/login";
import Article from "../page/Article/article";
import App from "../App";
import Layout from "../page/Layout/layout";
import About from "../page/About/about";
import Board from "../page/Board/board";

const router = createBrowserRouter([
    /*{
        path: '/',
        element: <App/>
    },*/
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/article/:name',
        element: <Article/>
    },
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'about',
                element: <About/>
            },
            {
                path: 'board',
                element: <Board/>
            }
        ]
    }
])

export default router