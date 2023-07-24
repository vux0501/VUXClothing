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
const getAllUser = () => {
    return axios.get(`/user/getAllUsers`);
};

const getUserWithPaginate = (page, limit) => {
    return axios.get(`/user/getAllUsers?page=${page}&limit=${limit}`);
};

const refreshToken = () => {
    return axios.post(`/user/refresh-token`, { withCredentials: true });
};

const logoutUser = () => {
    return axios.post(`/user/logout`);
};

const putUpdateUser = (id, name, phone, fileName, fileType, resultConvertImage, isAdmin) => {
    return axios.post(`/user/update-user`, {
        id: id,
        name: name,
        phone: phone,
        fileName: fileName,
        fileType: fileType,
        resultConvertImage: resultConvertImage,
        isAdmin: isAdmin,
    });
};

const deleteUser = (id) => {
    return axios.delete(`user/delete-user/${id}`);
};

export {
    postLogin,
    postRegister,
    getDetailUser,
    refreshToken,
    logoutUser,
    putUpdateUser,
    getAllUser,
    deleteUser,
    getUserWithPaginate,
};
