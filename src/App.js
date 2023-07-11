import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const App = () => {
    // useEffect(() => {
    //     fecthApi();
    // }, []);
    const fecthApi = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`);
        return res.data;
    };
    const query = useQuery({ queryKey: ['todos'], queryFn: fecthApi });
    console.log(query);
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
