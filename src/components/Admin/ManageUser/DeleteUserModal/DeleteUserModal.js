import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { toast } from 'react-toastify';
import { deleteUser } from '../../../../services/AuthServices';

const DeleteUserModal = (props) => {
    const { show, setShow, dataDelete, fetchListUsersWithPaginate, setCurrentPage } = props;

    const handleClose = () => setShow(false);

    const handleDeleteUser = async () => {
        let data = await deleteUser(dataDelete._id);
        if (data && data.status === 'OK') {
            toast.success(data.EM);
            handleClose();
            await fetchListUsersWithPaginate(0);
            setCurrentPage(0);
        }
        if (data && data.status !== 'OK') {
            toast.error(data.message);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muỗn xóa tài khoản: <b>{`${dataDelete.email}`}</b> ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy bỏ
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteUserModal;
