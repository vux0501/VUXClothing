import React, { useEffect, useState } from 'react';
import './ManageUser.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../../services/AuthServices';
import { Image, Table } from 'react-bootstrap';
import { GoPencil, GoTrash } from 'react-icons/go';

const ManageUser = () => {
    const navigate = useNavigate();
    const [arrUsers, setArrUsers] = useState([]);
    useEffect(() => {
        fetchAllUser();
    }, []);
    const fetchAllUser = async () => {
        const res = await getAllUser();

        setArrUsers(res.users);
    };
    console.log(arrUsers);

    //chuyen doi dinh dang ngay
    const convertDateFormat = (inputDate) => {
        const dateParts = inputDate.split('-');
        const day = dateParts[2];
        const month = dateParts[1];
        const year = dateParts[0];
        return `${day}/${month}/${year}`;
    };

    const convertISODateToFormattedDate = (ISODate) => {
        const dateWithoutTime = ISODate.split('T')[0];
        return convertDateFormat(dateWithoutTime);
    };

    return (
        <div className="manage-user-container">
            <div className="header">
                <h3>Quản lý tài khoản</h3>
            </div>
            <div className="content">
                <div className="btn-add-user">Thêm tài khoản admin</div>
                <div className="table">
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Họ và tên</th>
                                <th>Ngày tạo</th>
                                <th>Vai trò</th>
                                <th>Avatar</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers.map((user, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.name}</td>
                                        <td>{convertISODateToFormattedDate(user.createdAt)}</td>
                                        <td>{user.isAdmin ? 'ADMIN' : 'USER'}</td>
                                        <td>
                                            <Image
                                                src={user.avatar}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                    margin: 'auto',
                                                }}
                                                roundedCircle
                                            />
                                        </td>
                                        <td className="action-btn">
                                            <GoPencil className="edit-btn" />
                                            <GoTrash className="delete-btn" />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
