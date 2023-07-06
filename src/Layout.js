import App from './App';

import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Layout;
