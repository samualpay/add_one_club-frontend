// import axios from 'axios'
const storageKey = 'user'
type User = {
    username: string,
    token: string,
    expireTime: number
}
type CheckTokenExpireResp = {
    isValid:boolean;
    user: User | null;
}
class AuthService {
    login(username:string,password:string){
        let token = '123'
        let expireTime = new Date().getTime() + 60*1000
        localStorage.setItem(storageKey,JSON.stringify({username,token,expireTime}))
    }
    checkTokenExpire():CheckTokenExpireResp{
        const userStr:string|null = localStorage.getItem(storageKey)
        const now = new Date().getTime()
        if(userStr!= null){
            const user:User = JSON.parse(userStr)
            if(user.expireTime> now){
                return {isValid:true,user}
            }
        }
        return {isValid:false,user:null}
    }
}
export default new AuthService()