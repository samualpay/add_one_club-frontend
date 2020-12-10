import { ThunkAction } from "redux-thunk";
import authService from "../../service/auth.service";
import { LoadingAction } from "./loading";
// State
type UserState = {
  username: string | null;
  token: string | null;
  isLogin: boolean;
};

const initialState: UserState = { username: null, token: null, isLogin: false };
function getState(): UserState {
  const state = authService.checkTokenExpire();
  if (state.isValid && state.user !== null) {
    let user = state.user;
    return { username: user.username, token: user.token, isLogin: true };
  }
  return initialState;
}
//  Action
type UserAction = {
  type: string;
  payload: {
    username: string;
    token: string;
  } | null;
};
// Action Creator
export const login = (
  username: string,
  password: string,
  cb: (err?: any) => void
): ThunkAction<
  Promise<void>,
  UserState,
  unknown,
  UserAction | LoadingAction
> => {
  return async (dispatch) => {
    try {
      let user = await authService.login(username, password);
      dispatch({
        type: "user/LOGIN",
        payload: { username: user.username, token: user.token },
      });
      cb();
    } catch (err) {
      cb(err);
    }
  };
};

export const logout = (): UserAction => {
  authService.logout();
  return {
    type: "user/LOGOUT",
    payload: null,
  };
};

// Reducer
export function userReducer(state = getState(), action: UserAction): UserState {
  switch (action.type) {
    case "user/LOGIN":
      if (action.payload != null) {
        const { username, token } = action.payload;
        return { username, token, isLogin: true };
      }
      return initialState;
    case "user/LOGOUT":
      return initialState;
    default:
      return state;
  }
}
