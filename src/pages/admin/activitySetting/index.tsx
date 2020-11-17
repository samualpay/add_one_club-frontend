import React, { useEffect, useState } from 'react';

import {
  Form,
  Input,
  Select,
  Button,
  Modal,
  DatePicker
} from 'antd'
import './index.css';
import {
  areas,
  storeAttributes,
  machineTypes
} from '../../../data'
import Data from './type/data';
import MyTable from './component/table';
import ModifyModal from './component/modifyModal';
import machineService from '../../../service/machine.service';
import { PlusOutlined } from "@ant-design/icons";
import activityService from '../../../service/activity.service';
const { Option } = Select
const {RangePicker} = DatePicker


function Admin() {
  const initalData: Data = { id: '', imgUrl: '',videoUrl: '', description:'',timeRange:null,discounts:[],price:null}
  const [datas, setDatas] = useState<Array<Data>>([])
  const [modalData, setModalData] = useState<Data>(initalData)
  const [modalShow, setModalShow] = useState(false)
  const [form] = Form.useForm<Data>()
  function showErrorMessage(message:string){
    Modal.error({title: '錯誤',content:message})
  }
  async function onAdd(data: Data) {
    try{
      await activityService.create(data)
      await findAll()
    }catch(err){
      showErrorMessage(err.message)
    }
  }
  function onDeleteClick(id: string) {
    Modal.confirm({
      title: "確認刪除",
      content: (
        <p>{`確定要刪除活動[${id}]`}</p>
      ),
      onOk: () => {
        onDeleteHandle(id)
      }
    })
  }
  async function onDeleteHandle(id: string) {
    await activityService.delete(id)
    findAll()
  }
  async function findAll() {
    let datas = await activityService.findAll()
    setDatas(datas)
  }
  function onModifyClick(data: Data) {
    setModalData({...data})
    showModal()
  }
  async function onModifyHandle(data: Data) {
    try {
      await activityService.update(data)
      findAll()
    }catch(err){
      showErrorMessage(err.message)
    }finally{
      hideModal()
    }
  }
  function showModal() {
    setModalShow(true)
  }
  function hideModal() {
    setModalShow(false)
  }
  useEffect(() => {
    form.setFieldsValue(initalData)
    findAll()
  }, [])

  return (
    <div>
      <Form name="complex-form" form={form} onFinish={onAdd} >
        <Form.Item label="活動代碼">
          <Form.Item
            name="id"
            noStyle
            rules={[{ required: true, message: '未填活動代碼' }]}
          >
            <Input style={{ width: 160 }} placeholder="" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="產品視覺圖">
          <Form.Item
            name="imgUrl"
            noStyle
            rules={[{ required: true, message: '未填產品視覺圖' }]}
          >
            <Input style={{ width: 160 }} placeholder="" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="產品影片">
          <Form.Item
            name='videoUrl'
            noStyle
            rules={[{ required: true, message: '未填產品影片' }]}
          >
            <Input style={{ width: '100%' }} placeholder="詳細地址" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="產品資訊">
          <Form.Item
            name='description'
            noStyle
            rules={[{ required: true, message: '未填產品資訊' }]}
          >
            <Input style={{ width: '100%' }} placeholder="產品資訊" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="活動起迄時間">
          <Form.Item
            name='timeRange'
            noStyle
            // rules={[{ required: true, message: '未填活動起迄時間' }]}
          >
            <RangePicker showTime />
          </Form.Item>
          
        </Form.Item>
        <Form.Item label="產品定價">
          <Form.Item
            name='price'
            noStyle
            rules={[{ required: true, message: '未填產品定價' }]}
          >
            <Input style={{ width: '100%' }} placeholder="產品定價" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="降價階層數">
          <PlusOutlined />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            新增
          </Button>
        </Form.Item>
      </Form>
      <MyTable datas={datas} onDeleteClick={onDeleteClick} onModifyClick={onModifyClick} />
      <ModifyModal data={modalData} visible={modalShow} onCancel={hideModal} onOK={onModifyHandle} />
    </div>
  );
}


export default Admin;
