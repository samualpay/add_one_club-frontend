import React, { useEffect, useState } from 'react';

import {
  Form,
  Modal
} from 'antd'
import './index.css';
import { ActivityDto } from '../../../DTO/component/activity'
import MyTable from './component/table';
import ModifyModal from './component/modifyModal';
import activityService from '../../../service/activity.service';
import MyForm from './component/form';


function Admin() {
  const initalData: ActivityDto = { id: '', imgUrl: '', videoUrl: '', description: '', timeRange: null, discounts: [], price: null }
  const [datas, setDatas] = useState<Array<ActivityDto>>([])
  const [modalData, setModalData] = useState<ActivityDto>(initalData)
  const [modalShow, setModalShow] = useState(false)
  const [form] = Form.useForm<ActivityDto>()
  function showErrorMessage(message: string) {
    Modal.error({ title: '錯誤', content: message })
  }
  async function onAdd(data: ActivityDto, clearFn: () => void) {
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
  function onModifyClick(data: ActivityDto) {
    setModalData({ ...data })
    showModal()
  }
  async function onModifyHandle(data: ActivityDto) {
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
      <MyForm onFinish={onAdd} />
      <MyTable datas={datas} onDeleteClick={onDeleteClick} onModifyClick={onModifyClick} onEndClick={onEndClick} />
      <ModifyModal data={modalData} visible={modalShow} onCancel={hideModal} onOK={onModifyHandle} />
    </div>
  );
}


export default Admin;
