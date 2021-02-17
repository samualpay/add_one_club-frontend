import React from "react";
import { InputItem, Toast } from "antd-mobile";
type PhoneProp = {
  value: string;
  hasError: boolean;
  onChange: (value: string, hasError: boolean) => void;
  autoFocus?: boolean;
};
function PhoneInputItem({ value, hasError, onChange, autoFocus }: PhoneProp) {
  function onErrorClick() {
    if (hasError) {
      Toast.info("請輸入正確手機號碼");
    }
  }
  function onChangeHandle(value: string) {
    let error = false;
    if (!/^09[0-9]{8}$/.test(value)) {
      error = true;
    }
    onChange(value, error);
  }
  return (
    <InputItem
      type="number"
      placeholder="手機號碼"
      error={hasError}
      onErrorClick={onErrorClick}
      onChange={onChangeHandle}
      value={value}
      autoFocus={autoFocus}
      inputMode="numeric"
    >
      手機號碼
    </InputItem>
  );
}

export default PhoneInputItem;
