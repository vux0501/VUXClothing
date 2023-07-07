import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Img1 from '../../../assets/sample_product.jpg';

import './CarouselsDetail.scss';

const CarouselsDetail = () => {
    return (
        <>
            <Carousel slide className="carousel-container">
                <Carousel.Item>
                    <img className="d-block w-100" src={Img1} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={Img1} alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={Img1} alt="Third slide" />
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default CarouselsDetail;
