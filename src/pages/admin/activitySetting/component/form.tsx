import { Form, Input, DatePicker, Space, Button, InputNumber } from "antd";
import React, { useEffect } from "react";
import UploadImage from "../../../../components/uploadImage";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import Data from "../type/data";
import { ActivityDto } from "../../../../DTO/component/activity";
import moment, { Moment } from "moment";
import UploadVideo from "../../../../components/uploadVideo";
import UploadImages from "../../../../components/uploadImages";
import UploadVideos from "../../../../components/uploadVideos";
const { RangePicker } = DatePicker;
type MyFormPropsType = {
  onFinish: (data: ActivityDto, clearFn: () => void) => void;
  data?: ActivityDto;
  footer?: JSX.Element;
};
const initalData: ActivityDto = {
  id: -1,
  code: "",
  images: [],
  videos: [],
  name: "",
  description: "",
  timeRange: null,
  discounts: [],
  price: null,
  finalPrice: null,
};
const defaultFooter: JSX.Element = (
  <Button type="primary" htmlType="submit">
    新增
  </Button>
);
function MyForm({
  onFinish,
  data = initalData,
  footer = defaultFooter,
}: MyFormPropsType) {
  const [form] = Form.useForm<ActivityDto>();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);
  function clear() {
    form.setFieldsValue(initalData);
  }
  function disabledDate(currentDate: Moment) {
    return currentDate.diff(moment(), "minutes") < 1;
  }
  return (
    <Form
      name="complex-form"
      form={form}
      onFinish={(obj) => {
        obj.id = data.id;
        onFinish(obj, clear);
      }}
    >
      <Form.Item label="活動代碼">
        <Form.Item
          name="code"
          noStyle
          rules={[{ required: true, message: "未填活動代碼" }]}
        >
          <Input style={{ width: 160 }} placeholder="" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="產品視覺圖">
        <Form.Item
          name="images"
          noStyle
          // rules={[{ required: true, message: "未填產品視覺圖" }]}
        >
          <UploadImages />
          {/* <Input style={{ width: 160 }} placeholder="" /> */}
        </Form.Item>
      </Form.Item>
      <Form.Item label="產品影片">
        <Form.Item
          name="videos"
          noStyle
          // rules={[{ required: true, message: "未填產品影片" }]}
        >
          <UploadVideos />
          {/* <Input style={{ width: '100%' }} placeholder="詳細地址" /> */}
        </Form.Item>
      </Form.Item>
      <Form.Item label="產品名稱">
        <Form.Item
          name="name"
          noStyle
          rules={[{ required: true, message: "未填產品名稱" }]}
        >
          <Input style={{ width: "100%" }} placeholder="產品名稱" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="產品資訊">
        <Form.Item
          name="description"
          noStyle
          rules={[{ required: true, message: "未填產品資訊" }]}
        >
          <Input style={{ width: "100%" }} placeholder="產品資訊" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="活動起迄時間">
        <Form.Item
          name="timeRange"
          noStyle
          // rules={[{ required: true, message: '未填活動起迄時間' }]}
        >
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form.Item>
      <Form.Item label="產品定價">
        <Form.Item
          name="price"
          noStyle
          rules={[
            { required: true, message: "未填產品定價" },
            { type: "number", min: 0, message: "定價不得低於0元" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="產品定價"
            min={0}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="降價階層數"></Form.Item>
      <Form.List name="discounts">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space
                key={field.key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item label="層級">{index + 1}</Form.Item>
                <Form.Item
                  {...field}
                  label="人數"
                  name={[field.name, "peopleCount"]}
                  fieldKey={[field.fieldKey, "peopleCount"]}
                  rules={[
                    { required: true, message: "Missing peopleCount" },
                    { type: "number", min: 0, message: "人數不得低於0" },
                  ]}
                >
                  <InputNumber placeholder="人數" min={0} />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="百分比"
                  name={[field.name, "percent"]}
                  fieldKey={[field.fieldKey, "percent"]}
                  rules={[
                    {
                      required: true,
                      message: "Missing peopleCount",
                    },
                    {
                      type: "number",
                      min: 0,
                      max: 100,
                      message: "數值須介於0~100",
                    },
                  ]}
                >
                  <InputNumber placeholder="百分比" min={0} max={100} />
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item label=" " colon={false}>
        {footer}
      </Form.Item>
    </Form>
  );
}
export default MyForm;
