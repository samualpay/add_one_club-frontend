import { rejects } from "assert";
import { resolve } from "dns";
import { ThunkAction } from "redux-thunk";

type UserState = {
    username: string | null;
    token: string | null;
    isLogin: boolean;
};

const initialState: UserState = { username: null, token: null, isLogin: false }
type UserAction = {
    type: string,
    payload: {
        username: string,
        token: string
    } | null
}
// export const login = (username: string, password: string): UserAction => ({
//     type: 'user/LOGIN',
//     payload: { username, password }
// })
export const login = (username: string, password: string, cb: (result:boolean) => void): ThunkAction<Promise<void>, UserState, unknown, UserAction> => {
    return async dispatch => {
        if (username === '123' && password === '123') {
            const { username, token } = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ username: '123', token: '123' })
                }, 1000)
            })
            dispatch({ type: 'user/LOGIN', payload: { username, token } })
            cb(true)
        }
        cb(false)
    }
}

export const logout = (): UserAction => ({
    type: 'user/LOGOUT',
    payload: null
})

export function userReducer(state = initialState, action: UserAction): UserState {
    switch (action.type) {
        case 'user/LOGIN':
            if (action.payload != null) {
                const { username, token } = action.payload
                return { username, token, isLogin: true }
            }
            return initialState
        case 'user/LOGOUT':
            return initialState
        default:
            return state

    }
}