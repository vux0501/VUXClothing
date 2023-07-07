import React from 'react';
import './Product.scss';
import ProductCard from './ProductCard';
import Pagination from 'react-bootstrap/Pagination';

const Product = () => {
    return (
        <>
            <div className="product-container">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <div className="btn-more">
                <button>More</button>
            </div>
        </>
    );
};

export default Product;
