import * as taskConstants from '../constants/FunctionConstants';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FunctionReduceAction } from '../reducers/FunctionReduce'
import NetInfo from "@react-native-community/netinfo";
export const dispatchBrightness = (e: number):
    ThunkAction<Promise<void>, {}, {}, FunctionReduceAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, FunctionReduceAction>) => {
        try {
            dispatch(brightnessSuccess(e))
        } catch (e) {
            console.log(e)
        }
    }
}
export const brightnessSuccess = (e: number) => {
    return {
        type: taskConstants.BRIGHTNESS_TYPE,
        payload: {
            numberLight: e
        }
    }
};

export const dispatchDarkMode = (e: boolean):
    ThunkAction<Promise<void>, {}, {}, FunctionReduceAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, FunctionReduceAction>) => {
        try {
            dispatch(darkModeSuccess(e))
        } catch (e) {
            console.log(e)
        }
    }
}

export const darkModeSuccess = (e: boolean) => {
    return {
        type: taskConstants.DARKMODE_TYPE,
        payload: {
            isDarkMode: e
        }
    }
};
export const dispatchNetWork = ():
    ThunkAction<Promise<void>, {}, {}, any> => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            NetInfo.addEventListener((state:any) => {
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

export const dispatchPermium = (e: boolean):
    ThunkAction<Promise<void>, {}, {}, any> => {

    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            dispatch(permiumSuccess(e))
        } catch (e) {
            console.warn(e)

        }
    }
}
export const permiumSuccess = (e: boolean) => {
    return {
        type: taskConstants.PREMIUM_TYPE,
        payload: {
            isPremium: e
        }
    }
};

export const dispatchTurn = (e: number):
    ThunkAction<Promise<void>, {}, {}, any> => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
            dispatch(dispatchTurnSuccess(e))
        } catch (e) {
            console.log(e)
        }
    }
}
export const dispatchTurnSuccess = (e: number) => {
    return {
        type: taskConstants.TURN_TYPE,
        payload: {
            isTurn: e
        }
    }
};
export const dispatchActionTutorial = (e: boolean):
    ThunkAction<Promise<void>, {}, {}, any> => {
    return async (dispatch: ThunkDispatch<{}, {}, any>) => {
        try {
      
            dispatch(dispatchActionTutorialSuccess(e))
        } catch (e) {
            console.log(e)
        }
    }
}
export const dispatchActionTutorialSuccess = (e: boolean) => {
    return {
        type: taskConstants.TUTORIAL_TYPE,
        payload: {
            isTutorial: e
        }
    }
};