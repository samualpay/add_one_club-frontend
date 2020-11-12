import { Upload, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { resolve } from 'url';

function getBase64(img: Blob | File | undefined) {

    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result)
                // callback(reader.result)
            }
            resolve('')
        });
        if (img != undefined) {
            reader.readAsDataURL(img);
        }else{
            resolve('')
        }
    })
}

function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
type UploadImageProps = {

}
function UploadImage({ }: UploadImageProps) {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [previewVisisble, setPreviewVisible] = useState(false)
    async function handleChange(info: UploadChangeParam) {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            let imageUrl = await getBase64(info.file.originFileObj)
            setLoading(false)
            setImageUrl(imageUrl)
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    function handleCancel() {
        setPreviewVisible(false)
    }
    async function handlePreview(file: UploadFile) {
        // if (!file.url && !file.preview) {
        //     file.preview = await getBase64(file.originFileObj)
        // }
        // if(file.url || file.preview){

        // }
        if(imageUrl){
            setPreviewVisible(true)
        }
    }
    return (
        <>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onPreview={handlePreview}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <Modal
                visible={previewVisisble}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={imageUrl} />
            </Modal>
        </>

    )
}

export default UploadImage