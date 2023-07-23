import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { resetUser } from '../../redux/slides/userSlice';

import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Image, OverlayTrigger, Popover } from 'react-bootstrap';
import { logoutUser } from '../../services/AuthServices';
import { persistor } from '../../redux/store';

const Header = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logoutUser();
        dispatch(resetUser());
        //khi dang xuat chua mat persist:root o localstorage
        persistor.purge();
        localStorage.removeItem('access_token');
    };

    const popoverClickRootClose = (
        <Popover className="popover-container" id="popover-trigger-click-root-close">
            <div className="popover-content">
                <div className="popover-action" onClick={() => navigate('/info')}>
                    Thông tin cá nhân
                </div>
                {user.isAdmin ? (
                    <div className="popover-action" onClick={() => navigate('/admin')}>
                        Quản lý cửa hàng
                    </div>
                ) : (
                    <div className="popover-action">Giỏ hàng</div>
                )}
                <div className="popover-action">Đổi mật khẩu</div>
                <div
                    className="popover-action"
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Đăng xuất
                </div>
            </div>
        </Popover>
    );

    return (
        <Navbar fixed="top" expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
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
                        <NavLink to="/career" className="px-4 nav-link">
                            Career
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
                        <NavLink href="#home" className="px-4 cart nav-link">
                            <p className="cart-count">0</p>
                            <AiOutlineShoppingCart />
                        </NavLink>
                        {user?.avatar ? (
                            <OverlayTrigger
                                trigger="click"
                                rootClose
                                placement="bottom"
                                overlay={popoverClickRootClose}
                            >
                                <Image className="avatar mt-2 " src={user.avatar} roundedCircle />
                            </OverlayTrigger>
                        ) : (
                            <NavLink to="/login" className="px-4 nav-link">
                                <AiOutlineUser />
                            </NavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
