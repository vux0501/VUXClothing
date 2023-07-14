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

export { postLogin, postRegister, getDetailUser };
