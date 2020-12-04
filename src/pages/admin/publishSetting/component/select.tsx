import { Select } from "antd";
import React from "react";
const { Option } = Select;
type MySelectPropsType = {
  options: { id: number; name: string }[];
  onChange: (value: number) => void;
  value: number;
};
function MySelect({ options, onChange, value }: MySelectPropsType) {
  return (
    <Select style={{ width: 120 }} onChange={onChange} value={value}>
      {options.map((option) => (
        <Option value={option.id}>{option.name}</Option>
      ))}
    </Select>
  );
}
export default MySelect;
