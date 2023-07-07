import React, { useState } from 'react';
import './ProductDetail.scss';
import CarouselsDetail from './CarouselsDetail/CarouselsDetail';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();
    const sizes = ['S', 'M', 'L', 'XL'];
    const [size, setSize] = useState(sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const handleSubtractQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="detail-container">
            <div className="left-container">
                <div className="preview-image-detail">
                    <CarouselsDetail />
                </div>
            </div>
            <div className="right-container">
                <h2>Túi Gucci nữ GC2001</h2>
                <p className="mt-3">
                    Thương hiệu: <b>Gucci</b>
                </p>
                <p>
                    Tình trạng: <b>Còn hàng</b>
                </p>
                <h2>
                    Giá thành: <b>21.000.000</b> VND
                </h2>

                <p className="mt-3">Kích thước</p>
                <Form className="size">
                    {sizes.map((item, index) => (
                        <Form.Check key={index} type="radio" id={index + 1}>
                            <Form.Check.Input
                                value={item}
                                name="size"
                                type="radio"
                                onChange={(even) => setSize(even.target.value)}
                            />
                            <Form.Check.Label className={item === size ? 'checked-size' : 'size-detail'}>
                                {item}
                            </Form.Check.Label>
                        </Form.Check>
                    ))}
                </Form>

                <div className="quantity mt-4">
                    <div className="quantity-title">
                        <p>Số lượng</p>
                    </div>
                    <div className="quantity-action">
                        <button onClick={() => handleSubtractQuantity()}>-</button>
                        <Form.Control
                            type="email"
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                        />
                        <button
                            onClick={() => {
                                setQuantity(quantity + 1);
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="actions">
                    <button onClick={() => navigate('/typepage')} className="back-btn">
                        Quay lại
                    </button>
                    <button className="add-to-card-btn">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
