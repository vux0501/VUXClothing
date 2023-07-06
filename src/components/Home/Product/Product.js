import React from 'react';
import './Product.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import sampleProduct from '../../../assets/sample_product.jpg';
import { AiOutlinePlus } from 'react-icons/ai';

const Product = () => {
    return (
        <div className="product-container">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={sampleProduct} />
                <Card.Body>
                    <Card.Title>Ví Gucci</Card.Title>
                    <Card.Text>21.000.000 vnđ</Card.Text>
                    <AiOutlinePlus style={{ marginLeft: '230px' }} />
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={sampleProduct} />
                <Card.Body>
                    <Card.Title>Ví Gucci</Card.Title>
                    <Card.Text>21.000.000 vnđ</Card.Text>
                    <AiOutlinePlus style={{ marginLeft: '230px' }} />
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={sampleProduct} />
                <Card.Body>
                    <Card.Title>Ví Gucci</Card.Title>
                    <Card.Text>21.000.000 vnđ</Card.Text>
                    <AiOutlinePlus style={{ marginLeft: '230px' }} />
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={sampleProduct} />
                <Card.Body>
                    <Card.Title>Ví Gucci</Card.Title>
                    <Card.Text>21.000.000 vnđ</Card.Text>
                    <AiOutlinePlus style={{ marginLeft: '230px' }} />
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={sampleProduct} />
                <Card.Body>
                    <Card.Title>Ví Gucci</Card.Title>
                    <Card.Text>21.000.000 vnđ</Card.Text>
                    <AiOutlinePlus style={{ marginLeft: '230px' }} />
                </Card.Body>
            </Card>
        </div>
    );
};

export default Product;
