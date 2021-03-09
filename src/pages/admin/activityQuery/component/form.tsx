import { Form, Button, Select } from "antd";
import React from "react";
import { MachineDto } from "../../../../DTO/component/machine";
import { ActivityDto } from "../../../../DTO/component/activity";
import {
  ActivityStatus,
  ActivityStatusTranslationArr,
} from "../../../../enum/ActivityStatus";
const { Option } = Select;
type OnFinshProps = {
  status?: ActivityStatus;
};
type MyFormPropsType = {
  onFinish: (query: OnFinshProps) => void;
};
const defaultValue = { machineId: "", activityId: "", status: "" };
function MyForm({ onFinish }: MyFormPropsType) {
  return (
    <Form name="complex-form" initialValues={defaultValue} onFinish={onFinish}>
      <Form.Item label="活動狀態">
        <Form.Item name="status" noStyle>
          <Select>
            {ActivityStatusTranslationArr.filter(
              (elem) => elem.key !== "not_started"
            ).map((option, index) => (
              <Option value={option.key} key={index}>
                {option.value}
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
