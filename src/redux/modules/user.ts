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
        password: string
    } | null
}
export const login = (username: string, password: string): UserAction => ({
    type: 'user/LOGIN',
    payload: { username, password }
})

export const logout = (): UserAction => ({
    type: 'user/LOGOUT',
    payload: null
})

export function userReducer(state = initialState, action: UserAction): UserState {
    switch (action.type) {
        case 'user/LOGIN':
            if (action.payload != null) {
                const { username, password } = action.payload
                if (username === '123' && password === '123') {
                    return { username: '123', token: '123', isLogin: true }
                }
            }
            return initialState
        case 'user/LOGOUT':
            return initialState
        default:
            return state

    }
}