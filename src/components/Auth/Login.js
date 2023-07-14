import React, { useState } from 'react';
import './Login.scss';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDetailUser, postLogin } from '../../services/AuthServices';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [inputPasswordType, setInputPasswordType] = useState('password');
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleGetDetailUser = async (id, token) => {
        let res = await getDetailUser(id, token);
        dispatch(updateUser({ ...res.user, access_token: token }));
        toast.success(`Hi ${res.user.name}`);
    };

    const handleLogin = async () => {
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            toast.error('Email không đúng định dạng');
            return;
        }
        let data = await postLogin(email, password);

        if (data && data.status === 'ERR') {
            toast.error(data.message);
            return;
        }

        localStorage.setItem('access_token', data?.access_token);
        if (data?.access_token) {
            const decoded = jwt_decode(data?.access_token);
            if (decoded?.id) {
                handleGetDetailUser(decoded.id, data.access_token);
            }
        }

        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <p>
                    Bạn chưa có tài khoản? <b onClick={() => navigate('/register')}>Đăng ký</b>{' '}
                </p>
            </div>
            <div className="login-content">
                <div className="title">
                    <h1>Đăng nhập</h1>
                </div>
                <div className="login-form">
                    <Form>
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                type="email"
                                placeholder=""
                                onChange={(event) => setEmail(event.target.value)}
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
                        <p className="mt-1 forgot-password" onClick={() => {}}>
                            Quên mật khẩu?
                        </p>
                    </Form>
                </div>
                <div className="btn-login">
                    <button onClick={() => handleLogin()} disabled={!email.length || !password.length}>
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
