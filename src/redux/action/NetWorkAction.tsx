import * as taskConstants from '../constants/FunctionConstants';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FunctionReduceAction } from '../reducers/NetWorkReduce'
import NetInfo from "@react-native-community/netinfo";
export const dispatchNetWork = ():
    ThunkAction<Promise<void>, {}, {}, FunctionReduceAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, FunctionReduceAction>) => {
        try {
            NetInfo.addEventListener(state => {
                // console.log("Connection type", state.type);
                // console.log("Is connected?", state.isConnected);
                dispatch(netWorkSuccess(state.isConnected))
            });

        } catch (e) {
            console.warn(e)

        }
    }
}
export const netWorkSuccess = (e: boolean) => {
    return {
        type: taskConstants.NETWORK_TYPE,
        payload: {
            isNetWork: e
        }
    }
};