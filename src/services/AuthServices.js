import axios from '../utils/AxiosCustomize';

//auth
const postLogin = (email, password) => {
    return axios.post('/user/login', { email: email, password: password });
};

const postRegister = (email, password, name, phone) => {
    return axios.post('/user/register', { email: email, password: password, name: name, phone: phone });
};

export { postLogin, postRegister };
