import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from "./store";
import {Provider} from "react-redux";
import router from "./router";
import {RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // React.StrictMode->严格模式
    // <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
    // </React.StrictMode>
);

