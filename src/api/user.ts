import axios from './axios';
import { ResponseApiFull } from './responsive.interface';
export const PostLoginUser = (email: string, password: string): Promise<ResponseApiFull<any>> => {

    return axios.post('/user/login-user', {
        email,
        password
    })
}

export const PostregisterUser = (email: string, name: string, password: string): Promise<ResponseApiFull<any>> => {
    return axios.post('/user/register-user', {
        email,
        name,
        password
    })
}
export const PostUpdateInforUser = (avatar: string, token: string): Promise<ResponseApiFull<any>> => {
    return axios.post('user/update-user-info', {
        avatar
    }, {
        headers: {
            'token': token
        }
    })
}
export const getInforUser = (token: string): Promise<ResponseApiFull<any>> => {
    return axios.get('user/get-me-info', {
        headers: {
            'token': token
        }
    })
}
