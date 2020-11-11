import React, {useState } from 'react';

import {
  Form,
  Input,
  Select,
  Button
} from 'antd'
import './index.css';
import {
  areas,
  storeAttributes,
  machineTypes
} from '../../../data'
import Data from './type/data';
import MyTable from './component/table';
const { Option } = Select


function Admin() {
  const [datas,setDatas] = useState<Array<Data>>([])
  function onFinish(data: Data) {
    datas.push(data)
    setDatas(new Array(...datas))
  }
  function onDeleteClick(id:string){
    const items = datas.filter(data=> data.id !== id)
    setDatas(items)
  }
  function onModifyClick(data:Data){
    console.log('modify',data)
  }
  return (
    <div>
      <Form name="complex-form" onFinish={onFinish} >
        <Form.Item label="廣告代碼">
          <Form.Item
            name="id"
            noStyle
            rules={[{ required: true, message: '未填廣告代碼' }]}
          >
            <Input style={{ width: 160 }} placeholder="" />
          </Form.Item>
          {/* <Tooltip title="Useful information">
            <a href="#API" style={{ margin: '0 8px' }}>
              Need Help?
          </a>
          </Tooltip> */}
        </Form.Item>
        <Form.Item label="廣告機位置">
          <Input.Group compact>
            <Form.Item
              name='city'
              noStyle
              rules={[{ required: true, message: '未填city' }]}
            >
              <Select placeholder="縣市">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='dist'
              noStyle
              rules={[{ required: true, message: '未填dist' }]}
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
            name='address'
            noStyle
            rules={[{ required: true, message: '未填詳細地址' }]}
          >
            <Input style={{ width: '100%' }} placeholder="詳細地址" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="廣告機所在屬性">
          <Input.Group compact>
            <Form.Item
              name='area'
              noStyle
              rules={[{ required: true, message: '未填場域' }]}
            >
              <Select placeholder="場域">
                {
                  areas.map((elem, index) => (<Option key={index} value={elem}>{elem}</Option>))
                }
              </Select>
            </Form.Item>
            <Form.Item
              name='storeAttribute'
              noStyle
              rules={[{ required: true, message: '未填賣場屬性' }]}
            >
              <Select placeholder="賣場屬性">
                {
                  storeAttributes.map((elem, index) => (<Option key={index} value={elem}>{elem}</Option>))
                }
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="廣告機類型">
          <Form.Item
            name='machineType'
            noStyle
            rules={[{ required: true, message: '未填廣告機類型' }]}
          >
            <Select placeholder="廣告機類型">
              {
                machineTypes.map((elem, index) => (<Option key={index} value={elem}>{elem}</Option>))
              }
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            新增
          </Button>
        </Form.Item>
      </Form>
      <MyTable datas={datas} onDeleteClick={onDeleteClick} onModifyClick={onModifyClick}/>
    </div>
  );
}


export default Admin;
