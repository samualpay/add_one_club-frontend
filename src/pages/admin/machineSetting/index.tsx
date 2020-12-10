import React, { useEffect, useState } from "react";

import { Form, Input, Select, Button, Modal } from "antd";
import "./index.css";
import { areas, storeAttributes, machineTypes } from "../../../data";
import { MachineDto as Data } from "../../../DTO/component/machine";
import MyTable from "./component/table";
import ModifyModal from "./component/modifyModal";
import machineService from "../../../service/machine.service";
const { Option } = Select;

function Admin() {
  const initalData: Data = {
    id: 0,
    code: "",
    city: "",
    dist: "",
    address: "",
    area: "",
    machineType: "",
    storeAttribute: "",
  };
  const [datas, setDatas] = useState<Array<Data>>([]);
  const [modalData, setModalData] = useState<Data>(initalData);
  const [modalShow, setModalShow] = useState(false);
  const [form] = Form.useForm<Data>();
  async function onAdd(data: Data) {
    await machineService.createMachine(data);
    form.setFieldsValue(initalData);
    findMachines();
  }
  function onDeleteClick(id: number) {
    Modal.confirm({
      title: "確認刪除",
      content: <p>{`確定要刪除廣告機[${id}]`}</p>,
      onOk: () => {
        onDeleteHandle(id);
      },
    });
  }
  async function onDeleteHandle(id: number) {
    await machineService.deleteMachine(id);
    findMachines();
  }
  async function findMachines() {
    const datas = await machineService.findAllMachines();
    setDatas([...datas]);
  }
  function onModifyClick(data: Data) {
    setModalData({ ...data });
    showModal();
  }
  async function onModifyHandle(data: Data) {
    await machineService.updateMachine(data);
    findMachines();
    hideModal();
  }
  function showModal() {
    setModalShow(true);
  }
  function hideModal() {
    setModalShow(false);
  }
  useEffect(() => {
    form.setFieldsValue(initalData);
    findMachines();
  }, [form]);

  return (
    <div>
      <Form name="complex-form" form={form} onFinish={onAdd}>
        <Form.Item label="廣告機代碼">
          <Form.Item
            name="code"
            noStyle
            rules={[{ required: true, message: "未填廣告機代碼" }]}
          >
            <Input style={{ width: 160 }} placeholder="" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="廣告機位置">
          <Input.Group compact>
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
          </Input.Group>
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
          <Button type="primary" htmlType="submit">
            新增
          </Button>
        </Form.Item>
      </Form>
      <MyTable
        datas={datas}
        onDeleteClick={onDeleteClick}
        onModifyClick={onModifyClick}
      />
      <ModifyModal
        data={modalData}
        visible={modalShow}
        onCancel={hideModal}
        onOK={onModifyHandle}
      />
    </div>
  );
}

export default Admin;
