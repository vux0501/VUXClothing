import React, { useState } from 'react';
import './Register.scss';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postRegister } from '../../services/AuthServices';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('0');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //hidepassword
    const [show, setShow] = useState(false);
    const [inputPasswordType, setInputPasswordType] = useState('password');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const validatePhone = (phone) => {
        return String(phone)
            .toLowerCase()
            .match(/^0[0-9]\d{8}$/g);
    };

    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);
        const isValidPhone = validatePhone(phone);
        if (!isValidEmail) {
            toast.error('Email không đúng định dạng');
            return;
        }
        if (!isValidPhone) {
            toast.error('Số điện thoại gồm 10 số, bắt đầu bằng 0');
            return;
        }
        if (password && password.length < 6) {
            toast.error('Mật khẩu từ 6 kí tự trở lên.');
            return;
        }
        const data = await postRegister(email, name, phone, password, confirmPassword);
        if (data && data.status === 'ERR') {
            toast.error(data.message);
        }
        console.log(data);

        if (data && data.status === 'OK') {
            toast.success('Vui lòng đăng nhập để tiếp tục');
            navigate('/login');
        }
    };
    return (
        <div className="register-container">
            <div className="register-header">
                <p>
                    Bạn đã có tải khoản? <b onClick={() => navigate('/login')}>Đăng nhập</b>{' '}
                </p>
            </div>
            <div className="register-content">
                <div className="title">
                    <h1>Đăng ký</h1>
                </div>
                <div className="register-form">
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder=""
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Họ và Tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Số điện thoại - dùng để xác thực tài khoản</Form.Label>
                            <Form.Control
                                value={phone}
                                type="number"
                                placeholder=""
                                onChange={(event) => {
                                    setPhone(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 password-input" controlId="Password">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type={inputPasswordType}
                                placeholder=""
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <div className="icon-show-hide">
                                {show ? (
                                    <AiOutlineEyeInvisible
                                        onClick={() => {
                                            setInputPasswordType('password');
                                            setShow(!show);
                                        }}
                                    />
                                ) : (
                                    <AiOutlineEye
                                        onClick={() => {
                                            setInputPasswordType('text');
                                            setShow(!show);
                                        }}
                                    />
                                )}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 password-input" controlId="confirmPassword">
                            <Form.Label>Nhập lại mật khẩu</Form.Label>
                            <Form.Control
                                type={inputPasswordType}
                                placeholder=""
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                            <div className="icon-show-hide">
                                {show ? (
                                    <AiOutlineEyeInvisible
                                        onClick={() => {
                                            setInputPasswordType('password');
                                            setShow(!show);
                                        }}
                                    />
                                ) : (
                                    <AiOutlineEye
                                        onClick={() => {
                                            setInputPasswordType('text');
                                            setShow(!show);
                                        }}
                                    />
                                )}
                            </div>
                        </Form.Group>
                    </Form>
                </div>
                <div className="btn-register">
                    <button
                        disabled={!email || !name || !password || !phone || !confirmPassword}
                        onClick={() => handleRegister()}
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
