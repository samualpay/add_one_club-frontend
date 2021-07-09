import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../../redux/modules/user";
import { useHistory } from "react-router-dom";

import "./index.css";
import { Form, Input, Button, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import authService from "../../../service/auth.service";
import common from "../../../common";
import axiosForAdmin from "../../../config/axiosForAdmin";
import { dismiss, show } from "../../../redux/modules/loading";
type FormInputs = {
  username: string;
  password: string;
};
enum ButtonEnum {
  login,
  register,
}
function Admin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [btn, setBtn] = useState<ButtonEnum>(ButtonEnum.login);
  function showLoading() {
    dispatch(show());
  }
  function dismissLoading() {
    dispatch(dismiss());
  }
  function logoutHandle() {
    dispatch(logout());
  }
  axiosForAdmin.init({ showLoading, dismissLoading, onLogout: logoutHandle });
  const onFinish = async (values: FormInputs) => {
    const { username, password } = values;
    switch (btn) {
      case ButtonEnum.login:
        dispatch(
          login(username, password, (err) => {
            if (!err) {
              history.push("/admin");
            }
          })
        );
        break;
      case ButtonEnum.register:
        await authService.register(username, password);
        Modal.success({
          content: "註冊成功",
        });
        break;
    }
  };
  function clickHandle(btn: ButtonEnum) {
    return () => {
      setBtn(btn);
      form.submit();
    };
  }
  return (
    <div style={{ width: 330, margin: "auto", textAlign: "center" }}>
      <div style={{ height: 250 }} />
      <h1>加一後台管理系統</h1>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}
      </Form>
      <div style={{ margin: "auto", width: 330 }}>
        <Button
          type="primary"
          htmlType="button"
          onClick={clickHandle(ButtonEnum.login)}
          style={{ width: 330 }}
        >
          登入
        </Button>
      </div>
      <div style={{ height: 10 }}></div>
      <div style={{ margin: "auto", width: 330 }}>
        <Button
          type="primary"
          htmlType="button"
          onClick={clickHandle(ButtonEnum.register)}
          className="login-form-button"
          style={{ width: 330 }}
        >
          註冊
        </Button>
      </div>
    </div>
  );
}

export default Admin;
