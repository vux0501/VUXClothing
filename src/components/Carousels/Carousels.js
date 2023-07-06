import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Img1 from '../../assets/1.jpg';
import Img2 from '../../assets/2.jpg';
import Img3 from '../../assets/3.jpg';
import './Carousels.scss';

const Carousels = () => {
    return (
        <>
            <Carousel fade className="carousel-container">
                <Carousel.Item>
                    <img className="d-block w-100" src={Img1} alt="First slide" />
                    <Carousel.Caption>
                        <h3>NEW</h3>
                        <p>Woman 2023 Collection.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={Img2} alt="Second slide" />

                    <Carousel.Caption>
                        <h3>New</h3>
                        <p>Tưng bừng khai trương hệ thống cửa hàng mới tại quận Gò Vấp.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={Img3} alt="Third slide" />

                    <Carousel.Caption>
                        <h3>Hot</h3>
                        <p>Sơn Tùng M-TP bất ngờ diện bộ trang phục của VUX Clothing trong MV mới.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default Carousels;
