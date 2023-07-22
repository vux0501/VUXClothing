import React, { useState } from 'react';
import './ProductDetail.scss';
import CarouselsDetail from './CarouselsDetail/CarouselsDetail';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const location = useLocation();

    const data = location.state.data;
    const newPrice = data.price - (data.price * data.discountprice) / 100;

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
    const handleAdditionQuantity = () => {
        if (quantity < data.countInStock) {
            setQuantity(quantity + 1);
        } else {
            toast.error(`Chỉ còn ${data.countInStock} sản phẩm này!`);
        }
    };

    const handleAddToCard = (data) => {
        const req = { idProduct: data._id, size, quantity };
        console.log(req);
    };

    return (
        <div className="detail-container">
            <div className="left-container">
                <div className="preview-image-detail">
                    <CarouselsDetail />
                </div>
            </div>
            <div className="right-container">
                <h2>{data.name}</h2>
                <p className="mt-3">
                    Thương hiệu: <b>{data.brand}</b>
                </p>
                <p>
                    Tình trạng:{' '}
                    {data.countInStock === 0 ? <b>Tạm thời hết hàng</b> : <b>Còn {data.countInStock} chiếc</b>}
                </p>
                <h2>
                    Giá thành:{' '}
                    {!data.discountprice || data.discountprice === 0 ? (
                        <b>{data.price.toLocaleString('vi-VN')} VND</b>
                    ) : (
                        <div className="price-container">
                            <s>
                                {data.price.toLocaleString('vi-VN')} VND {''}
                            </s>
                            <b style={{ marginLeft: '12px' }}>{newPrice.toLocaleString('vi-VN')} VND</b>
                        </div>
                    )}
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
                                handleAdditionQuantity();
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
                    <button className="add-to-card-btn" onClick={() => handleAddToCard(data)}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
