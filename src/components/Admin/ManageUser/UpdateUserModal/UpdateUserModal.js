import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../../services/AuthServices';
import _ from 'lodash';
import Spinner from 'react-bootstrap/Spinner';

const UpdateUserModal = (props) => {
    const { show, setShow, dataUpdate, fetchListUsersWithPaginate, setCurrentPage } = props;
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setName(dataUpdate.name);
            setPhone(dataUpdate.phone);
            setRole(dataUpdate.isAdmin);
            setProfileImagePreview(dataUpdate.avatar);
        }
    }, [dataUpdate]);

    //loading
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState(false);

    //image
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [profileImagePreview, setProfileImagePreview] = useState('');

    // Avatar
    const handleImageChange = (e) => {
        const name = e.target.files[0].name;
        const lastDot = name.lastIndexOf('.');

        const fileName = name.substring(0, lastDot);
        const fileType = name.substring(lastDot + 1);
        setFileName(fileName);
        setFileType(fileType);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
    };

    const validatePhone = (phone) => {
        return String(phone)
            .toLowerCase()
            .match(/^0[0-9]\d{8}$/g);
    };

    const handleUpdateUser = async () => {
        const isValidPhone = validatePhone(phone);

        if (!isValidPhone) {
            toast.error('Số điện thoại gồm 10 số, bắt đầu bằng 0');
            return;
        }

        setIsLoading(true);
        const data = await putUpdateUser(dataUpdate._id, name, phone, fileName, fileType, profileImage, role);
        setIsLoading(false);

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

    const handleClose = () => {
        setEmail(dataUpdate.email);
        setName(dataUpdate.name);
        setPhone(dataUpdate.phone);
        setRole(dataUpdate.isAdmin);
        setProfileImage('');
        setFileName('');
        setFileType('');
        setShow(false);
    };
    return (
        <div>
            <>
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Cập nhập thông tin tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    disabled
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="phone"
                                    placeholder="name@example.com"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="name@example.com"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="role">
                                <Form.Label>Vai trò</Form.Label>
                                <Form.Select value={role} onChange={(event) => setRole(event.target.value)}>
                                    <option value={false}>User</option>
                                    <option value={true}>Admin</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                />

                                <div className="avatar-container">
                                    <div className="img-preview">
                                        {profileImage ? (
                                            <Image src={profileImage} roundedCircle />
                                        ) : (
                                            <Image src={profileImagePreview} roundedCircle />
                                        )}
                                    </div>
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : (
                            <>
                                <Button variant="secondary" onClick={handleClose}>
                                    Hủy
                                </Button>
                                <Button variant="danger" onClick={handleUpdateUser}>
                                    Cập nhập
                                </Button>
                            </>
                        )}
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
};

export default UpdateUserModal;
