import React from 'react';
import './Register.scss';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    return (
        <div className="register-container">
            <div className="register-header">
                <p>
                    Have an account? <b onClick={() => navigate('/login')}>Login</b>{' '}
                </p>
            </div>
            <div className="register-content">
                <div className="title">
                    <h1>Register</h1>
                </div>
                <div className="register-form">
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="email" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="" />
                        </Form.Group>
                    </Form>
                </div>
                <div className="btn-register">
                    <button onClick={() => navigate('/login')}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
