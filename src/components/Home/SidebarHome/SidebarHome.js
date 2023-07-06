import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import './SidebarHome.scss';

const SidebarHome = (props) => {
    const navigate = useNavigate();
    return (
        <Sidebar>
            <Menu>
                <SubMenu label="Áo">
                    <MenuItem> Áo thun </MenuItem>
                    <MenuItem> Áo khoác </MenuItem>
                    <MenuItem> Áo Polo </MenuItem>
                    <MenuItem>Áo sơ mi</MenuItem>
                    <MenuItem> Hoodies </MenuItem>
                    <MenuItem> Sweaters </MenuItem>
                </SubMenu>
                <SubMenu label="Quần">
                    <MenuItem> Quần jean </MenuItem>
                    <MenuItem> Quần đùi </MenuItem>
                </SubMenu>
                <SubMenu label="Váy">
                    <MenuItem> Đầm </MenuItem>
                    <MenuItem> Chân váy </MenuItem>
                </SubMenu>
                <SubMenu label="Phụ kiện">
                    <MenuItem> Nhẫn </MenuItem>
                    <MenuItem> Lắc tay </MenuItem>
                    <MenuItem> Đồng hồ </MenuItem>
                    <MenuItem> Nón </MenuItem>
                    <MenuItem> Ví </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default SidebarHome;
