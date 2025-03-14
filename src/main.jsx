import {StrictMode, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from "@/router/index.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Suspense>
        <StrictMode>
            <RouterProvider router={router}/>
        </StrictMode>
    </Suspense>
)