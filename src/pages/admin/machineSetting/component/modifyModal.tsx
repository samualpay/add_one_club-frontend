import { Button, Form, Input, Modal, Select, Space } from "antd";
import React, { useEffect } from "react";
import CityDistSelect from "../../../../components/cityDistSelect";
import { areas, machineTypes, storeAttributes } from "../../../../data";
import { MachineDto as Data } from "../../../../DTO/component/machine";
const { Option } = Select;
type ModifyModalProps = {
  data: Data;
  onOK: (data: Data) => void;
  onCancel: () => void;
  visible: boolean;
};

function ModifyModal({
  data: outerData,
  onOK,
  onCancel,
  visible,
}: ModifyModalProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(outerData);
  }, [outerData, form]);
  return (
    <Modal
      visible={visible}
      title="修改廣告機"
      onCancel={onCancel}
      footer={null}
    >
      <Form
        name="complex-form"
        form={form}
        onFinish={(values) => {
          onOK({ id: outerData.id, ...values });
        }}
      >
        <Form.Item label="廣告機代碼">
          <Form.Item
            name="code"
            noStyle
            rules={[{ required: true, message: "未填廣告機代碼" }]}
          >
            <Input readOnly={true} style={{ width: 160 }} placeholder="" />
          </Form.Item>
          {/* <Tooltip title="Useful information">
            <a href="#API" style={{ margin: '0 8px' }}>
              Need Help?
          </a>
          </Tooltip> */}
        </Form.Item>
        <Form.Item label="廣告機位置">
          <Form.Item name="location" noStyle>
            <CityDistSelect />
          </Form.Item>
          {/* <Input.Group compact>
            <Form.Item
              name="city"
              noStyle
              rules={[{ required: true, message: "未填city" }]}
            >
              <Select placeholder="縣市">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="dist"
              noStyle
              rules={[{ required: true, message: "未填dist" }]}
            >
              <Select placeholder="鄉鎮市區">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Form.Item>
          </Input.Group> */}
        </Form.Item>
        <Form.Item label="詳細地址">
          <Form.Item
            name="address"
            noStyle
            rules={[{ required: true, message: "未填詳細地址" }]}
          >
            <Input style={{ width: "100%" }} placeholder="詳細地址" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="廣告機所在屬性">
          <Input.Group compact>
            <Form.Item
              name="area"
              noStyle
              rules={[{ required: true, message: "未填場域" }]}
            >
              <Select placeholder="場域">
                {areas.map((elem, index) => (
                  <Option key={index} value={elem}>
                    {elem}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="storeAttribute"
              noStyle
              rules={[{ required: true, message: "未填賣場屬性" }]}
            >
              <Select placeholder="賣場屬性">
                {storeAttributes.map((elem, index) => (
                  <Option key={index} value={elem}>
                    {elem}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="廣告機類型">
          <Form.Item
            name="machineType"
            noStyle
            rules={[{ required: true, message: "未填廣告機類型" }]}
          >
            <Select placeholder="廣告機類型">
              {machineTypes.map((elem, index) => (
                <Option key={index} value={elem}>
                  {elem}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button.Group size="middle" style={{ float: "right" }}>
            <Space>
              <Button type="primary" htmlType="button" onClick={onCancel}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                更新
              </Button>
            </Space>
          </Button.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ModifyModal;
