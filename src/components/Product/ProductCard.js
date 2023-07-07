import React from 'react';
import Card from 'react-bootstrap/Card';
import { AiOutlinePlus } from 'react-icons/ai';
import sampleImage from '../../assets/sample_product.jpg';
import './ProductCard.scss';
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {
    const navigate = useNavigate();
    return (
        <Card style={{ width: '22rem' }} onClick={() => navigate('/detail')}>
            <Card.Img variant="top" src={sampleImage} />
            <Card.Body className="container-info">
                <div className="info-product">
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>21.000.000 vnd</Card.Text>
                </div>
                <div className="btn-add-to-card">
                    <AiOutlinePlus />
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
