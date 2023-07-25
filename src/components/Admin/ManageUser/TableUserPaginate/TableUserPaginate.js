import React, { useEffect } from 'react';
import { Form, Image, Table } from 'react-bootstrap';
import { GoPencil, GoTrash } from 'react-icons/go';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import './TableUserPaginate.scss';

const TableUserPaginate = (props) => {
    const {
        arrUsers,
        handleClickBtnUpdate,
        handleClickBtnDelete,
        fetchListUsersWithPaginate,
        pageCount,
        currentPage,
        setCurrentPage,
        sortBy,
        sortType,
        filterBy,
        filterValue,
        setSortBy,
        setSortType,
        setFilterBy,
        setFilterValue,
    } = props;
    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected, sortBy, sortType ? 'asc' : 'desc', filterBy, filterValue);
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
    console.log(filterBy);
    return (
        <div>
            <Form className="sort-filter-container">
                <Form.Group className="mb-3" controlId="filter">
                    <Form.Label>Tìm kiếm theo</Form.Label>
                    <Form.Select
                        value={filterBy}
                        onChange={(event) => {
                            const newFilterBy = event.target.value;
                            setFilterBy(newFilterBy);
                            setCurrentPage(0);
                        }}
                    >
                        <option value={'email'}>Email</option>
                        <option value={'name'}>Họ và Tên</option>
                        <option value={'phone'}>Số điện thoại</option>
                    </Form.Select>
                    <Form.Control type="text" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="sort">
                    <Form.Label>Sắp xếp (ngày tạo)</Form.Label>
                    <Form.Select
                        value={sortType}
                        onChange={(event) => {
                            const newValue = event.target.value === 'true';
                            setSortType(newValue);
                            setCurrentPage(0);
                        }}
                    >
                        <option value={false}>Mới nhất &#8594; Cũ nhất</option>
                        <option value={true}>Cũ nhất &#8594; Mới nhất</option>
                    </Form.Select>
                </Form.Group>
            </Form>

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
