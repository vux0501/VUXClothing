import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
            <Container className="d-flex header-container">
                <NavLink to="/" className="px-4 navbar-brand ">
                    VUX.clt
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <NavLink to="/news" className="px-4 nav-link">
                            News
                        </NavLink>
                        <NavLink to="/event" className="px-4 nav-link">
                            Event
                        </NavLink>
                        <NavLink to="/contact" className="px-4 nav-link">
                            Contact
                        </NavLink>
                        <NavLink to="/about" className="px-4 nav-link">
                            About
                        </NavLink>
                    </Nav>
                    <Nav></Nav>
                    <Form className="d-flex input-search">
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                        <CiSearch className="btn-search" />
                    </Form>
                    <Nav className="d-flex btn-right">
                        <Nav.Link href="#home" className="px-4">
                            <AiOutlineShoppingCart />
                        </Nav.Link>
                        <Nav.Link href="#link" className="px-4">
                            <AiOutlineUser />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
