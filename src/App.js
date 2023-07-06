import logo from './logo.svg';
import { DownloadOutlined } from '@ant-design/icons';
import './App.scss';
import { Button, Space } from 'antd';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<DownloadOutlined />}
                    size={36}
                    className="containerbutton"
                />
            </header>
        </div>
    );
}

export default App;
