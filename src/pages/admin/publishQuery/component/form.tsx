import { Form, Button, Select } from "antd";
import React from "react";
const { Option } = Select;
type MyFormPropsType = {
  label: string;
  options: string[];
  onFinish: (query: string) => void;
};
function MyForm({ label, options, onFinish }: MyFormPropsType) {
  return (
    <Form name="complex-form" onFinish={(data) => onFinish(data.id)}>
      <Form.Item label={label}>
        <Form.Item name="id" noStyle>
          <Select>
            {options.map((option, index) => (
              <Option value={option} key={index}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          查詢
        </Button>
      </Form.Item>
    </Form>
  );
}
export default MyForm;
