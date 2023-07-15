import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { store } from '../redux/store';
import { refreshToken } from '../services/AuthServices';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
    async (config) => {
        // const access_token = store?.getState()?.user?.access_token;
        // const decoded = jwtDecode(access_token);
        // if (decoded?.exp < new Date().getTime() / 1000) {
        //     console.log('Het han');
        //     const data = await refreshToken();
        const token = localStorage.getItem('access_token');
        //     console.log(data);
        //     config.headers.Authorization = `Bearer ${data.access_token}`;
        //     return config;
        // }

        config.headers.Authorization = `Bearer ${token}`;

        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data ? response.data : response;
    },
    async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const config = error?.config;

        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;

            const result = await refreshToken();
            console.log('aaa' + result);

            if (result?.access_token) {
                localStorage.setItem('access_token', result.access_token);
                config.headers.Authorization = `Bearer ${result?.access_token}`;
            }
            return axios(config);
        }
        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    },
);

export default instance;
