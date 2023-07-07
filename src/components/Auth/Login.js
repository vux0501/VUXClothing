import React from 'react';
import './Login.scss';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="email" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="" />
                        </Form.Group>
                        <p className="mt-1 forgot-password" onClick={() => {}}>
                            Forgot password
                        </p>
                    </Form>
                </div>
                <div className="btn-login">
                    <button onClick={() => navigate('/')}>LOGIN</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
