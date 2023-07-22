import React, { useEffect, useState } from 'react';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBIcon,
    MDBModalFooter,
    MDBInputGroup,
    MDBFile,
} from 'mdb-react-ui-kit';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import './InfoUser.scss';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../services/AuthServices';
import { updateUser } from '../../redux/slides/userSlice';
import { Image } from 'react-bootstrap';

const InfoUser = () => {
    console.log(process.env.REACT_APP_API_URL);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [optSmModal, setOptSmModal] = useState(false);
    const toggleShow = () => setOptSmModal(!optSmModal);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);

    //image
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [profileImage, setProfileImage] = useState(user.avatar);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {}, [user]);

    const validatePhone = (phone) => {
        return String(phone)
            .toLowerCase()
            .match(/^0[0-9]\d{8}$/g);
    };

    const handleUpdate = async () => {
        const isValidPhone = validatePhone(phone);

        if (!isValidPhone) {
            toast.error('Số điện thoại gồm 10 số, bắt đầu bằng 0');
            return;
        }

        const data = await putUpdateUser(user._id, name, phone, fileName, fileType, profileImage);

        if (data && data.status === 'ERR') {
            toast.error(data.message);
        }

        if (data && data.status === 'OK') {
            toast.success('Cập nhập thông tin thành công!');
            dispatch(updateUser({ name, phone, avatar: profileImage }));
            toggleShow();
        }
    };

    return (
        <>
            <section className="py-4" style={{ backgroundColor: '#f4f5f7' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol
                            lg="6"
                            className="mb-4 mb-lg-0"
                            onClick={() => {
                                toggleShow();
                            }}
                        >
                            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                <MDBRow className="g-0">
                                    <MDBCol
                                        md="4"
                                        className="gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                                    >
                                        <MDBCardImage
                                            src={user.avatar}
                                            alt="Avatar"
                                            className="my-5"
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                            }}
                                            fluid
                                        />
                                        <MDBTypography tag="h5" style={{ color: 'black' }}>
                                            {user.name}
                                        </MDBTypography>
                                        <MDBCardText>{user.isAdmin ? 'ADMIN' : 'USER'}</MDBCardText>
                                        <MDBIcon far icon="edit mb-5" />
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6">Thông tin cá nhân</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Email</MDBTypography>
                                                    <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Phone</MDBTypography>
                                                    <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <div className="d-flex justify-content-start">
                                                <a href="#!">
                                                    <MDBIcon fab icon="facebook me-3" size="lg" />
                                                </a>
                                                <a href="#!">
                                                    <MDBIcon fab icon="twitter me-3" size="lg" />
                                                </a>
                                                <a href="#!">
                                                    <MDBIcon fab icon="instagram me-3" size="lg" />
                                                </a>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <MDBModal show={optSmModal} tabIndex="-1" setShow={setOptSmModal}>
                <MDBModalDialog size="lg">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Cập nhập thông tin</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInputGroup className="mb-3" textBefore="Họ và Tên">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </MDBInputGroup>
                            <MDBInputGroup className="mb-3" textBefore="Số điện thoại">
                                <input
                                    className="form-control"
                                    type="number"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </MDBInputGroup>
                            <MDBFile
                                label="Ảnh đại diện"
                                id="customFile"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                            />
                            <div className="avatar-container">
                                <div className="img-preview">
                                    {profileImage ? (
                                        <Image src={profileImage} roundedCircle />
                                    ) : (
                                        <span>Preview Image</span>
                                    )}
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button className="btn-update" onClick={() => handleUpdate()}>
                                Cập nhập
                            </button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default InfoUser;
