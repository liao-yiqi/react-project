import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./store";
import {Provider} from "react-redux";
import router from "./router";
import {RouterProvider} from "react-router-dom";
import './theme.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // React.StrictMode->严格模式
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
    // </React.StrictMode>
);

