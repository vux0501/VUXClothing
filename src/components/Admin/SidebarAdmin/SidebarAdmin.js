import { Link, useNavigate } from 'react-router-dom';
import './SidebarAdmin.scss';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';

const SidebarAdmin = (props) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    return (
        <Sidebar>
            <Menu
                menuItemStyles={{
                    button: {
                        // the active class will be added automatically by react router
                        // so we can use it to style the active menu item
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        },
                    },
                }}
            >
                <div className="logo" onClick={() => navigate('/')}>
                    VUX.clt
                </div>
                <div className="info-admin">
                    <Image className="avatar" src={user.avatar} roundedCircle />
                    <h4>{user.name}</h4>
                </div>
                <SubMenu label="Chức năng">
                    <MenuItem onClick={() => navigate('/admin/manage-user')}>Quản lý tài khoản</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/manage-product')}> Quản lý sản phẩm </MenuItem>
                    <MenuItem onClick={() => navigate('/admin/manage-order')}> Quản lý hóa đơn </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default SidebarAdmin;
