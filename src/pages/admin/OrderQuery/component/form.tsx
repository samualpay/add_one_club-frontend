import { Form, Button, Select } from "antd";
import React from "react";
import { MachineDto } from "../../../../DTO/component/machine";
import { ActivityDto } from "../../../../DTO/component/activity";
import { OrderStatus } from "../../../../enum/OrderStatus";
const { Option } = Select;
type OnFinshProps = {
  machineId?: number;
  activityId?: string;
  status?: OrderStatus;
};
type MyFormPropsType = {
  machineOptions: MachineDto[];
  activityOptions: ActivityDto[];
  onFinish: (query: OnFinshProps) => void;
};
const defaultValue = { machineId: "", activityId: "", status: "" };
function MyForm({
  machineOptions,
  activityOptions,
  onFinish,
}: MyFormPropsType) {
  return (
    <Form name="complex-form" initialValues={defaultValue} onFinish={onFinish}>
      <Form.Item label="廣告機代碼">
        <Form.Item name="machineId" noStyle>
          <Select>
            <Option value="" key={-1}>
              {" "}
              -{" "}
            </Option>
            {machineOptions.map((option, index) => (
              <Option value={option.id} key={index}>
                {option.code}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item label="活動代碼">
        <Form.Item name="activityId" noStyle>
          <Select>
            <Option value="" key={-1}>
              {" "}
              -{" "}
            </Option>
            {activityOptions.map((option, index) => (
              <Option value={option.id} key={index}>
                {option.code}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item label="狀態">
        <Form.Item name="status" noStyle>
          <Select>
            <Option value=""> - </Option>
            <Option value="preorder">預定</Option>
            {/* <Option value="paid">已付款</Option> */}
            <Option value="paid">確定訂購</Option>
            <Option value="tally">理貨</Option>
            <Option value="shipment">出貨</Option>
            <Option value="finish">訂單完成</Option>
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
