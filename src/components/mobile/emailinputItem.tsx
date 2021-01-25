import React from "react";
import { InputItem, Toast } from "antd-mobile";
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
type EmailProp = {
  value: string;
  hasError: boolean;
  onChange: (value: string, hasError: boolean) => void;
  autoFocus?: boolean;
};
function EmailInputItem({ value, hasError, onChange, autoFocus }: EmailProp) {
  function onErrorClick() {
    if (hasError) {
      Toast.info("請輸入正確電子信箱");
    }
  }
  function onChangeHandle(value: string) {
    let error = false;
    if (!EMAIL_REGEX.test(value)) {
      error = true;
    }
    onChange(value, error);
  }
  return (
    <InputItem
      type="text"
      placeholder="電子信箱"
      error={hasError}
      onErrorClick={onErrorClick}
      onChange={onChangeHandle}
      value={value}
      autoFocus={autoFocus}
    >
      電子信箱
    </InputItem>
  );
}

export default EmailInputItem;
