import React, { useState } from 'react';
import './Login.scss';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postLogin } from '../../services/AuthServices';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleLogin = async () => {
        let data = await postLogin(email, password);

        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }

        if (data && data.status === 'ERR' && +data.type === 1) {
            toast.error('Tên đăng nhập không tồn tại');
        }
        if (data && data.status === 'ERR' && +data.type === 2) {
            toast.error('Sai mật khẩu');
        }

        if (data && data.status === 'OK') {
            toast.success(`Chào mừng bạn ${data.user.name}`);
            navigate('/');
            console.log(data);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <p>
                    Don't have an account? <b onClick={() => navigate('/register')}>Register</b>{' '}
                </p>
            </div>
            <div className="login-content">
                <div className="title">
                    <h1>Login</h1>
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
                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=""
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Form.Group>
                        <p className="mt-1 forgot-password" onClick={() => {}}>
                            Forgot password
                        </p>
                    </Form>
                </div>
                <div className="btn-login">
                    <button onClick={() => handleLogin()} disabled={!email.length || !password.length}>
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
