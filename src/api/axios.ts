import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BASE_URL ,SECRET_KEY_API } from '../../config';
import md5 from 'md5';
const instance:AxiosInstance = axios.create({
    baseURL: BASE_URL,
});
instance.interceptors.request.use(function (config:AxiosRequestConfig) {
    const unittime:number=  Date.now(); 
    const secret:string = md5(unittime+SECRET_KEY_API);
    config.headers.unittime=unittime;
    config.headers.secret = secret ;
    return config;
}, function (error) {
    return Promise.reject(error);
});
export default instance;