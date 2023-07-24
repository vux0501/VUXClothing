import React from 'react';
import { Image, Table } from 'react-bootstrap';
import { GoPencil, GoTrash } from 'react-icons/go';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

const TableUserPaginate = (props) => {
    const {
        arrUsers,
        handleClickBtnUpdate,
        handleClickBtnDelete,
        fetchListUsersWithPaginate,
        pageCount,
        currentPage,
        setCurrentPage,
    } = props;
    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected);
        setCurrentPage(+event.selected);
    };
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

    const userCurrent = useSelector((state) => state.user);

    return (
        <div>
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
                            <tr key={index}>
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
                                {userCurrent._id !== user._id ? (
                                    <td className="action-btn">
                                        <GoPencil className="edit-btn" onClick={() => handleClickBtnUpdate(user)} />
                                        <GoTrash className="delete-btn" onClick={() => handleClickBtnDelete(user)} />
                                    </td>
                                ) : (
                                    <td></td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className="table-paginate">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage}
                />
            </div>
        </div>
    );
};

export default TableUserPaginate;
