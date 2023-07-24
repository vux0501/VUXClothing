import React, { useEffect, useState } from 'react';
import './ManageUser.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllUser, getUserWithPaginate } from '../../../services/AuthServices';
import { Button, Image, Modal, Spinner, Table } from 'react-bootstrap';
import { GoPencil, GoTrash } from 'react-icons/go';
import DeleteUserModal from './DeleteUserModal/DeleteUserModal';
import UpdateUserModal from './UpdateUserModal/UpdateUserModal';
import TableUserPaginate from './TableUserPaginate/TableUserPaginate';

const ManageUser = () => {
    const LIMIT_USER = 5;
    const navigate = useNavigate();

    const [arrUsers, setArrUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchListUsersWithPaginate(0);
    }, []);

    const fetchListUsersWithPaginate = async (page) => {
        setIsLoading(true);
        const res = await getUserWithPaginate(page, LIMIT_USER);
        setIsLoading(false);
        if (res.status === 'OK') {
            setArrUsers(res.users);
            setPageCount(res.totalPage);
        }
    };

    //delete
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const handleClickBtnDelete = (user) => {
        setShowDeleteUserModal(true);
        setDataDelete(user);
    };

    //Update
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const handleClickBtnUpdate = (user) => {
        setShowUpdateUserModal(true);
        setDataUpdate(user);
    };

    return (
        <div className="manage-user-container">
            <div className="header">
                <h3>Quản lý tài khoản</h3>
            </div>
            <div className="content">
                <div className="table">
                    <TableUserPaginate
                        arrUsers={arrUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            {isLoading ? <Spinner animation="border" /> : <></>}
            <DeleteUserModal
                show={showDeleteUserModal}
                setShow={setShowDeleteUserModal}
                dataDelete={dataDelete}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                setCurrentPage={setCurrentPage}
            />
            <UpdateUserModal
                show={showUpdateUserModal}
                setShow={setShowUpdateUserModal}
                dataUpdate={dataUpdate}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default ManageUser;
