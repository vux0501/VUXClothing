import React, { useEffect, useState } from 'react';
import './Admin.scss';
import SidebarAdmin from './SidebarAdmin/SidebarAdmin';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getDetailUser, refreshToken } from '../../services/AuthServices';
import { updateAccessToken, updateUser } from '../../redux/slides/userSlice';

const Admin = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    let token = localStorage.getItem('access_token');
    const [isLogin, setIsLogin] = useState(user.isLogin);

    useEffect(() => {
        if (token) {
            checkAuth();
        }
    }, []);

    const checkAuth = async () => {
        const decoded = jwtDecode(token);
        if (decoded?.exp < new Date().getTime() / 1000) {
            const data = await refreshToken();
            if (!data) {
                setIsLogin(false);
                return;
            }
            token = data.access_token;
            localStorage.setItem('access_token', token);
        }
        dispatch(updateAccessToken({ access_token: token }));
        setIsLogin(true);
    };

    useEffect(() => {
        if (!token) return;
        const decoded = jwtDecode(token);
        if (!isLogin) return;
        if (decoded && decoded.id) handleGetDetailUser(decoded.id);
    }, [isLogin]);

    const handleGetDetailUser = async (id) => {
        let res = await getDetailUser(id);
        dispatch(updateUser(res.user));
    };

    return (
        <div className="admin-container">
            <div className="sidebar-left">
                <SidebarAdmin />
            </div>

            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
