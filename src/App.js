import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import Footer from './components/Footer/Footer';

const App = () => {
    return (
        <div className="app-container">
            <div className="header-container">
                <Header />
            </div>

            <div className="main-content container">
                <Outlet />
            </div>

            <div className="header-container">
                <Footer />
            </div>
        </div>
    );
};

export default App;
