import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/modules/user";
import { useHistory } from "react-router-dom";

import "./index.css";
import { Form, Input, Button, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import authService from "../../../service/auth.service";
import common from "../../../common";
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
  const onFinish = async (values: FormInputs) => {
    const { username, password } = values;
    switch (btn) {
      case ButtonEnum.login:
        dispatch(
          login(username, password, (err) => {
            if (err) {
              common.showErrorModal(err);
            } else {
              history.push("/admin");
            }
          })
        );
        break;
      case ButtonEnum.register:
        try {
          await authService.register(username, password);
          Modal.success({
            content: "註冊成功",
          });
        } catch (err) {
          common.showErrorModal(err);
        }
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
    <div className="App">
      {/* <h1>登入頁 </h1>
      <input placeholder="username" value={username} onChange={inputChange('username')} />
      <input placeholder="password" value={password} onChange={inputChange('password')} />
      <button onClick={clickHandle}>登入</button> */}
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            onClick={clickHandle(ButtonEnum.login)}
            className="login-form-button"
          >
            登入
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            onClick={clickHandle(ButtonEnum.register)}
            className="login-form-button"
          >
            註冊
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Admin;
