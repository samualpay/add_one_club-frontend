import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./modules/user";
import { loadingReducer } from "./modules/loading";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
