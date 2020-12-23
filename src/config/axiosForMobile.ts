import { Toast } from "antd-mobile";
import Axios, { AxiosInstance } from "axios";
type initProps = {
  showLoading: () => void;
  dismissLoading: () => void;
};
class AxiosForAdmin {
  axios: AxiosInstance;
  private isInit: boolean;
  constructor() {
    this.isInit = false;
    this.axios = Axios.create();
  }
  init({ showLoading, dismissLoading }: initProps) {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    this.axios.interceptors.request.use(
      (config) => {
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
        dismissLoading();
        Toast.offline(`Network connection failed! (${error.response.status})`);
        return Promise.reject(error);
      }
    );
  }
}
export default new AxiosForAdmin();
