import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Data from '../type/data'
type ModifyModalProps = {
    data: Data;
    onOK: (data: Data) => void
    onCancel: () => void
    visible: boolean
    confirmLoading: boolean
}
function ModifyModal({ data: outerData, onOK, onCancel, visible, confirmLoading }: ModifyModalProps) {
    const [data, setData] = useState(outerData)
    function handleChange(columName: string, value: string) {
        return () => {
            switch (columName) {
                case 'city':
                    data.city = value
                    break;
                case 'dist':
                    data.dist = value
                    break;
                case 'address':
                    data.address = value
                    break;
                case 'area':
                    data.area = value
                    break
                case 'machineType':
                    data.machineType = value
                    break
                case 'storeAttribute':
                    data.storeAttribute = value
                    break
            }
            setData({...data})
        }
    }
    useEffect(() => {
        setData(outerData)
    }, [outerData])
    return (
        <Modal
            visible={visible}
            title="Title"
            onOk={() => { onOK(data) }}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
            </Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={() => { onOK(data) }}>
                    確定
            </Button>,
            ]}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}
export default ModifyModal