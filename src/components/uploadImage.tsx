import {
  Upload,
  message,
  Modal,
  Tooltip,
  Progress,
  Image,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  RcCustomRequestOptions,
} from "antd/lib/upload/interface";
import React, { useEffect, useState } from "react";
import uploadService from "../service/upload.service";

type UploadImageProps = {
    url?:string
};
function UploadImage({url}: UploadImageProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  useEffect(()=>{
      if(url){
          setImageUrl(url)
      }else{
          setImageUrl('')
      }
  },[url])
  function beforeUpload(file: RcFile) {
    setProgress(0);
    setLoading(true);
    return true;

    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //     message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //     message.error('Image must smaller than 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
  }
  function onDeleteClick(){
      Modal.confirm({
          title:"確認刪除",
          onOk:()=>{setImageUrl('')}
      })
  }
  async function handleChange({
    file,
    event,
  }: UploadChangeParam<UploadFile<{ url: string }>>) {
    //console.log(info.file.status)
    if (file.status === "uploading") {
      setLoading(true);
      if (event) {
        setProgress(event.percent);
      }
    }
    if (file.status === "done") {
      setLoading(false);
      setProgress(0);
      if (file.response !== undefined) {
        console.log(file.response.url);
        setImageUrl(file.response.url);
      }
    }
    if (file.status === "error") {
      Modal.error({
        title: "上傳失敗",
      });
    }
  }
  const uploadButton = (
    <div>
      {loading ? (
        <Progress type="circle" percent={progress} width={60} />
      ) : (
        <PlusOutlined />
      )}
      <div style={{ marginTop: 8 }}>上傳</div>
    </div>
  );
  const imageButton = (
    <Tooltip
      placement="top"
      title={() => (
        <>
          <Upload
            name="avatar"
            className="image-upload-grid"
            showUploadList={false}
            accept="image/*"
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <a style={{ color: "#FFF" }}>重新上傳</a>
          </Upload>
          <Divider type="vertical" style={{ width: "2px" }} />
          <a style={{ color: "#FFF" }} onClick={onDeleteClick}>刪除</a>
        </>
      )}
      trigger="hover"
    >
      {loading ? (
        <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
          {uploadButton}
        </div>
      ) : (
        <Image
          src={imageUrl}
          width={104}
          height={104}
          style={{ marginRight: 8, marginBottom: 8 }}
        ></Image>
      )}
    </Tooltip>
  );
  async function customRequest({
    onSuccess,
    onProgress,
    onError,
    file,
  }: RcCustomRequestOptions) {
    try {
      const { url } = await uploadService.uploadImage(file, (percent) => {
        onProgress({ percent }, file);
      });
      onSuccess({ url }, file);
    } catch (err) {
      onError(err);
    }
  }
  return (
    <>
      {imageUrl ? (
        imageButton
      ) : (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          // className="image-upload-grid"
          showUploadList={false}
          accept="image/*"
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          customRequest={customRequest}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {uploadButton}
        </Upload>
      )}
    </>
  );
}

export default UploadImage;
