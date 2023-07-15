import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import { isJsonString } from './utils/JsonString';
import jwt_decode from 'jwt-decode';
import { axiosJWT, getDetailUser, refreshToken } from './services/AuthServices';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccessToken, updateUser } from './redux/slides/userSlice';
import jwtDecode from 'jwt-decode';

const App = () => {
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
        <div className="app-container">
            <div className="header-container">
                <Header />
            </div>

            <div className="main-content">
                <Outlet />
            </div>

            <div className="header-container">
                <Footer />
            </div>
        </div>
    );
};

export default App;
