import App from './App';

import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import News from './components/News/News';
import Event from './components/Event/Event';
import Contact from './components/Contact/Contact';
import About from './components/About/About';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="news" element={<News />} />
                    <Route path="event" element={<Event />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
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
