import React from 'react';
import Carousels from '../Carousels/Carousels';

import './HomePage.scss';
import Product from '../Product/Product';

import SidebarType from '../SidebarType/SidebarType';

const HomePage = () => {
    return (
        <>
            <div className="top-container">
                <Carousels />
            </div>
            <div className="bot-container">
                <div className="side-nav">
                    <SidebarType />
                </div>
                <div className="content">
                    <Product />
                </div>
            </div>
        </>
    );
};

export default HomePage;
