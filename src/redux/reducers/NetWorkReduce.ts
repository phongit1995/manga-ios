import * as types from '../constants/FunctionConstants';
const initialState = {
    isNetWork: true,
};
export interface SuccessAction<T> {
    type: string,
    payload: T
}
export interface ErrorAction {
    type: string,
    payload: {
        message: string
    }
}


export type netWorkActionPayload = {
    isNetWork: boolean
}

export type FunctionReduceAction = SuccessAction<netWorkActionPayload>

export type FunctionReducePayload = {
    isNetWork: boolean,
}
const reducer = (state: FunctionReducePayload = initialState, action: FunctionReduceAction) => {
    switch (action.type) {
        case types.NETWORK_TYPE: {
            action = <SuccessAction<netWorkActionPayload>>action
            return {
                ...state,
                isNetWork: action.payload.isNetWork
            };
        }
        default:
            return state;
    }
};
export default reducer;
