import {StrictMode, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import router from "@/router/index.jsx";
import store from "@/store";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <Suspense>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </Suspense>
    </StrictMode>
)