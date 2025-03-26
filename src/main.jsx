import {Suspense} from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import router from "@/router/index.jsx";
import store from "@/store";
import 'normalize.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Suspense fallback={'加载中...'}>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </Suspense>
)