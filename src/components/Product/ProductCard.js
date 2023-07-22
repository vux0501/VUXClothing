import React from 'react';
import Card from 'react-bootstrap/Card';
import { AiOutlinePlus } from 'react-icons/ai';
import sampleImage from '../../assets/sample_product.jpg';
import './ProductCard.scss';
import { useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
    const navigate = useNavigate();
    const data = props.data;
    const newPrice = data.price - (data.price * data.discountprice) / 100;

    console.log('new:', data);

    return (
        <Card
            style={{ width: '22rem' }}
            onClick={() => navigate('/detail', { state: { data: data } })}
            className="card-container"
        >
            {!data.discountprice || data.discountprice === 0 ? (
                <></>
            ) : (
                <span className="discount"> -{data.discountprice} % </span>
            )}
            <Card.Img variant="top" src={sampleImage} />
            <Card.Body className="container-info">
                <div className="info-product">
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        {!data.discountprice || data.discountprice === 0 ? (
                            <p>{data.price.toLocaleString('vi-VN')} VND</p>
                        ) : (
                            <div className="price-container">
                                <s>
                                    {' '}
                                    {data.price.toLocaleString('vi-VN')} VND {''}
                                </s>
                                <p>{newPrice.toLocaleString('vi-VN')} VND</p>
                            </div>
                        )}{' '}
                    </Card.Text>
                </div>
                <div className="btn-add-to-card">
                    <AiOutlinePlus />
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
