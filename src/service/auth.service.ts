import axios from 'axios'
const storageKey = 'user'
type User = {
    username: string,
    token: string,
    expireTime: number
}
type LoginResult = {
    isValid: boolean;
    user: User | null;
}
type RegisterResult = {
    isSuccess: boolean;
    message: string | null
}
class AuthService {
    async login(username: string, password: string) { //server login並回傳結果
        //todo call login api
        let token = '123'
        let expireTime = new Date().getTime() + 1000 * 1000
        localStorage.setItem(storageKey, JSON.stringify({ username, token, expireTime }))
        const result = await new Promise<LoginResult>(reslove => {
            setTimeout(() => {
                reslove({ isValid: true, user: { username: username, token: token, expireTime: expireTime } })
            }, 1000)
        })
        return result
    }
    checkTokenExpire(): LoginResult {// 於重load時確認當前頁面是否登入過
        const userStr: string | null = localStorage.getItem(storageKey)
        const now = new Date().getTime()
        if (userStr != null) {
            const user: User = JSON.parse(userStr)
            if (user.expireTime > now) {
                return { isValid: true, user }
            }
        }
        return { isValid: false, user: null }
    }
    logout() {
        localStorage.removeItem(storageKey)
    }
    async getProfile(token: string) {//跟server要使用者資訊
        //todo call getProfile api
        return { username: 'xxx' }
    }
    async register(username: string, password: string): Promise<RegisterResult> {
        //todo call register api
        return { isSuccess: true, message: null }
        // return {isSuccess:false,message:'帳號已存在'}
    }
}
export default new AuthService()