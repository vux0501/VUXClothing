import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { FaFacebookF, FaGoogle, FaYoutube, FaTwitter } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { BsTelephone } from 'react-icons/bs';
import { CiMail } from 'react-icons/ci';

const Footer = () => {
    const links_social = {
        facebook: 'https://www.facebook.com/vux0501/',
    };
    return (
        <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
            <section className="d-flex justify-content-center  p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                    <span>Social networks</span>
                </div>

                <div className="btn-social">
                    <a href={links_social.facebook} className="me-4">
                        <FaFacebookF style={{ color: 'black' }} />
                    </a>
                    <a href={links_social.facebook} className="me-4">
                        <FaGoogle style={{ color: 'black' }} />
                    </a>
                    <a href={links_social.facebook} className="me-4">
                        <SiZalo style={{ color: 'black' }} />
                    </a>
                    <a href={links_social.facebook} className="me-4">
                        <FaYoutube style={{ color: 'black' }} />
                    </a>
                    <a href={links_social.facebook} className="me-4">
                        <FaTwitter style={{ color: 'black' }} />
                    </a>
                </div>
            </section>

            <section className="">
                <MDBContainer className="text-center text-md-start mt-5">
                    <MDBRow className="mt-3">
                        <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                            <h5 className="text-uppercase fw-bold mb-4">
                                <MDBIcon icon="gem" className="me-3" />
                                Hệ thống cửa hàng
                            </h5>
                            <h6 className="py-2">Hồ Chí Minh</h6>
                            <p className="mx-4">Chi nhánh 1</p>
                            <p className="mx-4">Chi nhánh 2</p>
                            <p className="mx-4">Chi nhánh 3</p>
                            <p className="mx-4">Chi nhánh 4</p>
                            <h6 className="py-2">Hà Nội</h6>
                            <p className="mx-4">Chi nhánh 1</p>
                            <h6 className="py-2">Đà Nẵng</h6>
                            <p className="mx-4">Chi nhánh 1</p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                            <h5 className="text-uppercase fw-bold mb-4">Liên hệ</h5>
                            <p>
                                <CiMail className="mr-2" style={{ fontSize: 18 }} /> hvudtkt@gmail.com
                            </p>
                            <p>
                                <BsTelephone className="mr-2" /> 033 504 7747
                            </p>
                            <p>
                                <BsTelephone className="mr-2" /> 091 299 9999
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright: Nguyễn Hoàng Vũ
            </div>
        </MDBFooter>
    );
};

export default Footer;
