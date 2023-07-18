import axios from '../utils/AxiosCustomize';

//auth
const postLogin = (email, password) => {
    return axios.post('/user/login', { email: email, password: password });
};

const postRegister = (email, name, phone, password, confirmPassword) => {
    return axios.post('/user/register', {
        email: email,
        name: name,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
    });
};

const getDetailUser = (id) => {
    return axios.get(`/user/get-detail-user/${id}`);
};
const refreshToken = () => {
    return axios.post(`/user/refresh-token`, { withCredentials: true });
};

const logoutUser = () => {
    return axios.post(`/user/logout`);
};

const putUpdateUser = (id, name, phone, fileName, fileType, resultConvertImage) => {
    return axios.post(`/user/update-user`, {
        id: id,
        name: name,
        phone: phone,
        fileName: fileName,
        fileType: fileType,
        resultConvertImage: resultConvertImage,
    });
};

export { postLogin, postRegister, getDetailUser, refreshToken, logoutUser, putUpdateUser };
