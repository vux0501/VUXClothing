import React, { useEffect, useState } from 'react';
import './ManageUser.scss';
import { useNavigate } from 'react-router-dom';
import { getAllUserWithPaginate } from '../../../services/AuthServices';
import { Spinner } from 'react-bootstrap';

import DeleteUserModal from './DeleteUserModal/DeleteUserModal';
import UpdateUserModal from './UpdateUserModal/UpdateUserModal';
import TableUserPaginate from './TableUserPaginate/TableUserPaginate';

const ManageUser = () => {
    const LIMIT_USER = 5;
    const navigate = useNavigate();

    const [arrUsers, setArrUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState();

    const [isLoading, setIsLoading] = useState(false);

    //sort
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortType, setSortType] = useState(false);

    //filter
    const [filterBy, setFilterBy] = useState('email');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        fetchListUsersWithPaginate(0, sortBy, sortType ? 'asc' : 'desc', filterBy, filterValue);
    }, [sortType, filterBy, filterValue]);

    const fetchListUsersWithPaginate = async (page, sortBy, sortType, filterBy, filterValue) => {
        setIsLoading(true);
        const res = await getAllUserWithPaginate(page, LIMIT_USER, sortBy, sortType, filterBy, filterValue);
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
                        sortBy={sortBy}
                        sortType={sortType}
                        setSortBy={setSortBy}
                        setSortType={setSortType}
                        filterBy={filterBy}
                        setFilterBy={setFilterBy}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
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
                sortBy={sortBy}
                sortType={sortType}
            />
            <UpdateUserModal
                show={showUpdateUserModal}
                setShow={setShowUpdateUserModal}
                dataUpdate={dataUpdate}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                setCurrentPage={setCurrentPage}
                sortBy={sortBy}
                sortType={sortType}
            />
        </div>
    );
};

export default ManageUser;
