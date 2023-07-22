import React from 'react';
import './Product.scss';
import ProductCard from './ProductCard';
import Pagination from 'react-bootstrap/Pagination';
import { getAllProduct } from '../../services/ProductServices';
import { useEffect } from 'react';
import { useState } from 'react';

const Product = () => {
    const [arrProducts, setArrProducts] = useState([]);

    useEffect((res) => {
        fetchAllProduct();
    }, []);

    const fetchAllProduct = async () => {
        const res = await getAllProduct();
        setArrProducts(res.products);
        console.log(res.products);
    };
    return (
        <>
            <div className="product-container">
                {arrProducts.map((product, index) => {
                    return <ProductCard key={index} data={product} />;
                })}
            </div>
            <div className="btn-more">
                <button>More</button>
            </div>
        </>
    );
};

export default Product;
