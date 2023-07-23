import React, { useEffect, useState } from 'react';
import './Admin.scss';
import SidebarAdmin from './SidebarAdmin/SidebarAdmin';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getDetailUser, refreshToken } from '../../services/AuthServices';
import { updateAccessToken, updateUser } from '../../redux/slides/userSlice';

const Admin = () => {
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
