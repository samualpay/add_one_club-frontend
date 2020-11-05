import {createStore,combineReducers,applyMiddleware} from 'redux'
import {userReducer} from './modules/user'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer,applyMiddleware(thunk))
export default store