import { combineReducers } from 'redux'
import UserReduce from './UserReduce'
import Loading from './Loading'
import FunctionReduce ,{FunctionReducePayload} from './FunctionReduce'
import NetWorkReduce from './NetWorkReduce'
export type AppState = {
    UserReduce,
    Loading,
    FunctionReduce:FunctionReducePayload,
    NetWorkReduce,
}
const rootReducer = combineReducers<AppState>({
    UserReduce,
    Loading,
    FunctionReduce,
    NetWorkReduce,
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
