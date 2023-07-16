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

const putUpdateUser = (id, name, phone) => {
    return axios.put(`/user/update-user/${id}`, { name: name, phone: phone });
};

export { postLogin, postRegister, getDetailUser, refreshToken, logoutUser, putUpdateUser };
