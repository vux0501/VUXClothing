import axios from '../utils/AxiosCustomize';

const getAllProduct = () => {
    return axios.get(`/product/getAll?`);
};

export { getAllProduct };
