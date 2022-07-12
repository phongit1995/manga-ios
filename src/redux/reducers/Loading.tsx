import * as types from '../constants/Loading';
const initialState = {
    showloading : false
};
const reducer = (state = initialState, action: any) => {

    switch (action.type) {
        case types.SHOWLOADING: {
            return{
                ...state,
                showloading : true
            };
        }
        case types.HIDELOADING: {
            return{
                ...state,
                showloading : false
            };
        }
        default:
            return state;
    }
};
export default reducer; 