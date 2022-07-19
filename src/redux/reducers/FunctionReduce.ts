import * as types from '../constants/FunctionConstants';
const initialState = {
    isDarkMode: false,
    numberLight: 0,
    isPremium: true,
    isTurn: 0,
    isTutorial: true
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
export type DarkModeActionPayload = {
    isDarkMode: boolean,
}

export type NumberLightActionPayload = {
    numberLight: number
}

export type netWorkActionPayload = {
    isNetWork: boolean
}
export type PremisumActionPayload = {
    isPremium: boolean
}
export type TurnReducePayload = {
    isTurn: number
}
export type TutorialReducePayload = {
    isTutorial: boolean
}
export type FunctionReduceAction = SuccessAction<DarkModeActionPayload> | ErrorAction |
    SuccessAction<NumberLightActionPayload> |
    SuccessAction<PremisumActionPayload>|
    SuccessAction<TurnReducePayload>|
    SuccessAction<TutorialReducePayload>

export type FunctionReducePayload = {
    isDarkMode: boolean,
    numberLight: number,
    isPremium: boolean,
    isTurn: number,
    isTutorial: boolean
}
const reducer = (state: FunctionReducePayload = initialState, action: FunctionReduceAction) => {
    switch (action.type) {
        case types.DARKMODE_TYPE: {
            action = <SuccessAction<DarkModeActionPayload>>action
            return {
                ...state,
                isDarkMode: action.payload.isDarkMode
            };
        }
        case types.BRIGHTNESS_TYPE: {
            action = <SuccessAction<NumberLightActionPayload>>action
            return {
                ...state,
                numberLight: action.payload.numberLight
            };
        }
        case types.PREMIUM_TYPE: {
            action = <SuccessAction<PremisumActionPayload>>action
            return {
                ...state,
                isPremium: action.payload.isPremium
            };
        }
        case types.TURN_TYPE: {
            action = <SuccessAction<TurnReducePayload>>action
            return {
                ...state,
                isTurn: action.payload.isTurn
            };
        }
        case types.TUTORIAL_TYPE: {
            action = <SuccessAction<TutorialReducePayload>>action

            return {
                ...state,
                isTutorial: action.payload.isTutorial
            };
        }
        default:
            return state;
    }
};
export default reducer;
