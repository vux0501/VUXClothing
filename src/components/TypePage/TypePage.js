import React from 'react';

import './TypePage.scss';
import Product from '../Product/Product';

import SidebarType from '../SidebarType/SidebarType';

const TypePage = () => {
    window.scrollTo(0, 0);
    return (
        <>
            <div className="top-container">
                <h1>Type page</h1>
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

export default TypePage;
