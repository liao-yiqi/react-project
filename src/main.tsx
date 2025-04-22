import {createRoot} from 'react-dom/client'
import {Suspense} from "react";
import {RouterProvider} from "react-router-dom";
import router from "./router";

createRoot(document.getElementById('root')!).render(
    <Suspense>
        <RouterProvider router={router}/>
    </Suspense>
)
