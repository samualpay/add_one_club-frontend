import axios from "axios";
import { Dispatch } from "react";
import authService from "../service/auth.service";
import { show, dismiss } from "../redux/modules/loading";
let isInit = false;
class MyAxios {
  init(dispatch: Dispatch<any>) {
    if (isInit) return;
    isInit = true;
    axios.interceptors.request.use(
      (config) => {
        const { isValid, user } = authService.checkTokenExpire();
        if (isValid && user !== null) {
          const { token } = user;
          config.headers.authorization = token;
        }
        dispatch(show());
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    axios.interceptors.response.use(
      (resp) => {
        dispatch(dismiss());
        return resp;
      },
      (error) => {
        dispatch(dismiss());
        return Promise.reject(error);
      }
    );
  }
}
export default new MyAxios();
