import axios from "axios";
const storageKey = "user";
type User = {
  username: string;
  token: string;
  expireTime: number;
};
type LoginResult = {
  isValid: boolean;
  user: User | null;
};

class AuthService {
  async login(username: string, password: string) {
    let result = await axios.post<{
      username: string;
      token: string;
      expireTime: number;
    }>("/api/login", { username, password });
    localStorage.setItem(storageKey, JSON.stringify(result.data));
    return result.data;
  }
  checkTokenExpire(): LoginResult {
    // 於重load時確認當前頁面是否登入過
    const userStr: string | null = localStorage.getItem(storageKey);
    const now = new Date().getTime();
    if (userStr != null) {
      const user: User = JSON.parse(userStr);
      if (user.expireTime > now) {
        return { isValid: true, user };
      }
    }
    return { isValid: false, user: null };
  }
  logout() {
    localStorage.removeItem(storageKey);
  }
  async getProfile(token: string) {
    //跟server要使用者資訊
    //todo call getProfile api
    return { username: "xxx" };
  }
  async register(username: string, password: string): Promise<void> {
    await axios.post("/api/register", { username, password });
  }
}
export default new AuthService();
