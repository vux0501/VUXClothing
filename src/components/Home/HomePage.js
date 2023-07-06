import React from 'react';
import Carousels from '../Carousels/Carousels';
import SidebarHome from './SidebarHome/SidebarHome';
import './HomePage.scss';
import Product from './Product/Product';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div className="top-container">
                <Carousels />
            </div>
            <div className="bot-container">
                <div className="side-nav">
                    <SidebarHome />
                </div>
                <div className="content">
                    <Product />
                </div>
            </div>
        </>
    );
};

export default HomePage;
