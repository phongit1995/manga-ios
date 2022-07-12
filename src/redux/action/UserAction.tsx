import * as userActionTypes from '../constants/UserContants';
import NetInfo from "@react-native-community/netinfo";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { PostLoginUser, PostregisterUser } from '../../api/user'
import { userAction, ErrorAction } from '../reducers/UserReduce'
import { showloading, hideloading } from "../action/Loading";
export interface userWithEmail {
    email: string,
    name: string,
    password: string
}
export const LoginRequest = (user: userWithEmail):
    ThunkAction<Promise<void>, {}, {}, userAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            dispatch(showloading());
            PostLoginUser(user.email, user.password).then((result) => {
                if (result.data.status === "success") {
                    dispatch(LoginSuccess(result.data.data))
                } else {
                    dispatch(RegisterFailure('Register Failed!'))
                }
            })
                .catch((e) => {
                    if (e.response.data.code === 400) {
                        dispatch(RegisterFailure('Please check your email or password!'))
                    }
                })
            dispatch(hideloading());
        } catch (e) {
            console.warn(e)

        }
    }
}
export const LoginFailure = (): ErrorAction => {
    return {
        type: userActionTypes.LOGIN_FAILURE,
        payload: {
            message: 'Login Failed!'
        }
    }
}
export const LoginSuccess = (payload: any) => {

    return {
        type: userActionTypes.LOGIN_SUCCESS,
        payload: payload
    }
}

export const RegisterRequest = (user: userWithEmail):
    ThunkAction<Promise<void>, {}, {}, userAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            dispatch(showloading());
            PostregisterUser(user.email, user.name, user.password).then((result) => {
                if (result.data.status === "success") {
                    dispatch(RegisterSucess(user))
                } else {
                    dispatch(RegisterFailure('Register Failed!'))
                }
            })
                .catch((e) => {
                    if (e.response.data.code === 400) {
                        if (e.response.data.message === 'EMAIL_IS_EXITS') {
                            dispatch(RegisterFailure('Email already exists'))
                        } else {
                            dispatch(RegisterFailure('Register Failed!'))
                        }
                    }
                })
            dispatch(hideloading());
        } catch (e) {
            console.warn(e)

        }
    }
}
export const RegisterSucess = (payload: any): ErrorAction => {
    return {
        payload: payload,
        type: userActionTypes.REGISTER_SUCCESS
    }
}
export const RegisterFailure = (e: string): ErrorAction => {
    return {
        payload: {
            message: e
        },
        type: userActionTypes.REGISTER_FAILURE
    }
}
export const LogoutRequest = ():
    ThunkAction<Promise<void>, {}, {}, userAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            dispatch({
                type: userActionTypes.LOGOUT_SUCCESS,
                payload: {}
            })
        } catch (e) {
            dispatch({
                type: userActionTypes.LOGOUT_FAILURE,
                payload: {
                    message: 'Can not logout now!'
                }
            })
        }
    }
}