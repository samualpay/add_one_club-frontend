import Axios, { AxiosInstance } from "axios";
import authService from "../service/auth.service";
import { Modal } from "antd";
type initProps = {
  showLoading: () => void;
  dismissLoading: () => void;
  onLogout: () => void;
};
class AxiosForAdmin {
  axios: AxiosInstance;
  private isInit: boolean;
  constructor() {
    this.isInit = false;
    this.axios = Axios.create();
  }
  init({ showLoading, dismissLoading, onLogout }: initProps) {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    this.axios.interceptors.request.use(
      (config) => {
        const { isValid, user } = authService.checkTokenExpire();
        if (isValid && user !== null) {
          const { token } = user;
          config.headers.authorization = token;
        }
        showLoading();
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    this.axios.interceptors.response.use(
      (resp) => {
        dismissLoading();
        return resp;
      },
      (error) => {
        if (error.response.data.status === 401) {
          onLogout();
        } else {
          Modal.error({
            title: `錯誤:${error.response.data.status}`,
            content: error.response.data.message,
          });
        }
        dismissLoading();
        return Promise.reject(error);
      }
    );
  }
}
export default new AxiosForAdmin();
