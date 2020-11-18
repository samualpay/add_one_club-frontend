import React, { useEffect, useState } from 'react';

import {
  Form,
  Input,
  Select,
  Button,
  Modal,
  DatePicker,
  Space
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
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import activityService from '../../../service/activity.service';
import UploadImage from '../../../components/uploadImage';
import MyForm from './component/form';
const { Option } = Select
const { RangePicker } = DatePicker


function Admin() {
  const initalData: Data = { id: '', imgUrl: '', videoUrl: '', description: '', timeRange: null, discounts: [], price: null }
  const [datas, setDatas] = useState<Array<Data>>([])
  const [modalData, setModalData] = useState<Data>(initalData)
  const [modalShow, setModalShow] = useState(false)
  const [form] = Form.useForm<Data>()
  function showErrorMessage(message: string) {
    Modal.error({ title: '錯誤', content: message })
  }
  async function onAdd(data: Data,clearFn: ()=>void) {
    try {
      data.discounts = data.discounts.filter(elem => elem.peopleCount !== undefined && elem.percent !== undefined)
      await activityService.create(data)
      await findAll()
      clearFn()
    } catch (err) {
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
  function onEndClick(id: string) {
    Modal.confirm({
      title: "確認停止",
      content: (
        <p>{`確定要停止活動[${id}]`}</p>
      ),
      onOk: () => {
        onEndHandle(id)
      }
    })
  }
  async function onEndHandle(id: string) {
    await activityService.end(id)
    findAll()
  }
  async function findAll() {
    let datas = await activityService.findAll()
    setDatas(datas)
  }
  function onModifyClick(data: Data) {
    setModalData({ ...data })
    showModal()
  }
  async function onModifyHandle(data: Data) {
    try {
      data.discounts = data.discounts.filter(elem => elem.peopleCount !== undefined && elem.percent !== undefined)
      await activityService.update(data)
      findAll()
    } catch (err) {
      showErrorMessage(err.message)
    } finally {
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
      <MyForm onFinish={onAdd}/>
      <MyTable datas={datas} onDeleteClick={onDeleteClick} onModifyClick={onModifyClick} onEndClick={onEndClick}/>
      <ModifyModal data={modalData} visible={modalShow} onCancel={hideModal} onOK={onModifyHandle} />
    </div>
  );
}


export default Admin;
