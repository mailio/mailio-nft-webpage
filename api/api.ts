
import axios, { AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { NFT_SERVER_URL } from '../config';
import { AUTH_TOKEN } from '../types/user';

const API = axios.create({
    baseURL: NFT_SERVER_URL + "/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 0
    }
});

const requestHandler = (request: AxiosRequestConfig) => {
    const jwtToken = localStorage.getItem(AUTH_TOKEN);
    if (!request.headers) {
        request.headers = {};
    }
    request.headers.Authorization = `${jwtToken}`;
    return request;
};

const responseHandler = (response: any) => {
    return response;
};

API.interceptors.request.use(
    (request) => requestHandler(request)
);

API.interceptors.response.use(
    (response) => responseHandler(response)
);


// response error handling
API.interceptors.response.use((next) => Promise.resolve(next),
    (error) => {
        const msg = error.message;
        // only show error messages above 500
        if (error.response?.status) {
            if (error.response.status >= 500) {
                toast.error(msg);
            }
        }
        return Promise.reject(error);
    });

export default API;
