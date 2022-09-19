import { ToastAndroid } from 'react-native';
import * as types from '../constants/UserContants';
import Toast from 'react-native-toast-message';

const initialState = {
    user: {},
    Loading: false
};
export interface SuccessAction<T> {
    type: string,
    payload: {
        user: T,
        Loading: T
    }
}

export interface ErrorAction {
    type: string,
    payload: {
        message: string
    }
}

export type UserReducePayload = {
    user: any,
    Loading: boolean
}
export type userAction = SuccessAction<UserReducePayload> | ErrorAction
    | SuccessAction<undefined>
export type UserReduceAction = SuccessAction<UserReducePayload> | ErrorAction

const reducer = (state: UserReducePayload = initialState, action: UserReduceAction) => {
    switch (action.type) {
        case types.LOGIN_REQUEST: {
            action = <SuccessAction<UserReducePayload>>action
            return {
                ...state,
            };
        }
        case types.LOGIN_SUCCESS:
            action = <SuccessAction<UserReducePayload>>action
            Toast.show({
                type:"success",
                text1:"Success",
                text2:"Login Success 👌",
                visibilityTime:5000,
                
            })
            state = { ...state, user: { ...action.payload } }
            return state
        case types.LOGIN_FAILURE:
            action = <ErrorAction>action
            const message = action.payload.message
            Toast.show({
                type:"error",
                text1:"Success",
                text2:message,
                visibilityTime:5000,
                
            })
            return state
        case types.REGISTER_REQUEST:
            state = { ...state, user: {} }
            return state
        case types.REGISTER_SUCCESS:
            action = <SuccessAction<UserReducePayload>>action
            Toast.show({
                type:"success",
                text1:"Success",
                text2:"Register Success 👌",
                visibilityTime:5000,
                
            })
            state = { ...state, user: { ...action.payload } }
            return state
        case types.REGISTER_FAILURE:
            action = <ErrorAction>action
            const message2 = action.payload.message
            Toast.show({
                type:"error",
                text1:"Success",
                text2:message2,
                visibilityTime:5000,
                
            })
            return state
        case types.LOGOUT_SUCCESS:
            Toast.show({
                type:"success",
                text1:"Success",
                text2:"Logout Success 👌",
                visibilityTime:5000,
                
            })
            return { user: {} }
        case types.LOGOUT_FAILURE:
            action = <ErrorAction>action
            Toast.show({
                type:"error",
                text1:"Success",
                text2:action.payload.message,
                visibilityTime:5000,
                
            })
            return state
        default:
            return state;
    }
};
export default reducer;
