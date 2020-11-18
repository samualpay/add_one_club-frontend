import { Form, Input, DatePicker, Space, Button } from "antd";
import React, { useEffect, useImperativeHandle, useState } from "react";
import UploadImage from "../../../../components/uploadImage";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Data from "../type/data";
const { RangePicker } = DatePicker
type MyFormPropsType = {
    onFinish: (data: Data, clearFn: () => void) => void,
    data?: Data,
    footer?: JSX.Element
}
const initalData: Data = { id: '', imgUrl: '', videoUrl: '', description: '', timeRange: null, discounts: [], price: null }
const defaultFooter: JSX.Element = (<Button type="primary" htmlType="submit">新增</Button>)
function MyForm({ onFinish, data = initalData, footer = defaultFooter }: MyFormPropsType) {
    const [form] = Form.useForm<Data>()
    useEffect(() => {
        form.setFieldsValue(data)
    }, [data])
    function clear() {
        form.setFieldsValue(initalData)
    }
    return (
        <Form name="complex-form" form={form} onFinish={(data) => onFinish(data, clear)} >
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
                    <UploadImage />
                    {/* <Input style={{ width: 160 }} placeholder="" /> */}
                </Form.Item>
            </Form.Item>
            <Form.Item label="產品影片">
                <Form.Item
                    name='videoUrl'
                    noStyle
                    rules={[{ required: true, message: '未填產品影片' }]}
                >
                    <UploadImage />
                    {/* <Input style={{ width: '100%' }} placeholder="詳細地址" /> */}
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
            </Form.Item>
            <Form.List name="discounts">
                {
                    (fields, { add, remove }) => (
                        <>
                            {
                                fields.map((field, index) => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item label="層級">
                                            {index + 1}
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="人數"
                                            name={[field.name, 'peopleCount']}
                                            fieldKey={[field.fieldKey, 'peopleCount']}
                                            rules={[{ required: true, message: 'Missing peopleCount' }]}
                                        >
                                            <Input placeholder="peopleCount" type="number" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="百分比"
                                            name={[field.name, 'percent']}
                                            fieldKey={[field.fieldKey, 'percent']}
                                            rules={[{ required: true, message: 'Missing peopleCount' }]}
                                        >
                                            <Input placeholder="percent" type="number" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => { remove(field.name) }} />
                                    </Space>
                                ))
                            }
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                    </Button>
                            </Form.Item>
                        </>
                    )
                }
            </Form.List>

            <Form.Item label=" " colon={false}>
                {footer}
            </Form.Item>
        </Form>
    )
}
export default MyForm