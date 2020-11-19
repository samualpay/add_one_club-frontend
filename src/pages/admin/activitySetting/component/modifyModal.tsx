import { Button, Form, Modal, Select, Space } from "antd";
import React, { useEffect } from "react";
import { ActivityDto } from '../../../../DTO/component/activity'
import MyForm from "./form";
const { Option } = Select
type ModifyModalProps = {
    data: ActivityDto;
    onOK: (data: ActivityDto) => void
    onCancel: () => void
    visible: boolean
}

function ModifyModal({ data: outerData, onOK, onCancel, visible }: ModifyModalProps) {
    function Footer() {
        return (
            <Button.Group size='middle' style={{ float: 'right' }}>
                <Space>
                    <Button type="primary" htmlType="button" onClick={onCancel}>取消</Button>
                    <Button type="primary" htmlType="submit">更新</Button>
                </Space>
            </Button.Group>
        )
    }
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(outerData)
        // setData(outerData)
    }, [outerData])
    return (
        <Modal
            visible={visible}
            title="修改活動"
            // onOk={() => { onOK(data) }}
            onCancel={onCancel}
            footer={null}
        >
            <MyForm data={outerData} onFinish={onOK} footer={<Footer />} />
        </Modal>
    )
}
export default ModifyModal