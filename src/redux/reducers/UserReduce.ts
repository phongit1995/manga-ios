import { ToastAndroid } from 'react-native';
import * as types from '../constants/UserContants';
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
            ToastAndroid.show('Login Success 👌', ToastAndroid.SHORT);
            state = { ...state, user: { ...action.payload } }
            return state
        case types.LOGIN_FAILURE:
            action = <ErrorAction>action
            const message = action.payload.message
            ToastAndroid.show(message, ToastAndroid.SHORT);
            return state
        case types.REGISTER_REQUEST:
            state = { ...state, user: {} }
            return state
        case types.REGISTER_SUCCESS:
            action = <SuccessAction<UserReducePayload>>action
            ToastAndroid.show('Register Success 👌', ToastAndroid.SHORT);
            state = { ...state, user: { ...action.payload } }
            return state
        case types.REGISTER_FAILURE:
            action = <ErrorAction>action
            const message2 = action.payload.message
            ToastAndroid.show(message2, ToastAndroid.SHORT);
            return state
        case types.LOGOUT_SUCCESS:
            ToastAndroid.show('Logout Success 👌', ToastAndroid.SHORT)
            return { user: {} }
        case types.LOGOUT_FAILURE:
            action = <ErrorAction>action
            ToastAndroid.show(action.payload.message, ToastAndroid.SHORT)
            return state
        default:
            return state;
    }
};
export default reducer;
