import { Upload, Modal, Tooltip, Progress, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  RcCustomRequestOptions,
} from "antd/lib/upload/interface";
import React, { useEffect, useState } from "react";
import uploadService from "../service/upload.service";
import MyVideo from "./video";
type UploadVideoProps = {
  value?: string;
  onChange?: (value: string) => void;
};
function UploadVideo({ value, onChange }: UploadVideoProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  function beforeUpload(file: RcFile) {
    setProgress(0);
    setLoading(true);
    return true;
  }
  function setVideoUrl(url: string) {
    if (onChange) {
      onChange(url);
    }
  }
  function onDeleteClick() {
    Modal.confirm({
      title: "確認刪除",
      onOk: () => {
        setVideoUrl("");
      },
    });
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
        setVideoUrl(file.response.url);
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
            accept="video/*"
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <button className="link-button" style={{ color: "#FFF" }}>
              重新上傳
            </button>
          </Upload>
          <Divider type="vertical" style={{ width: "2px" }} />
          <button
            className="link-button"
            style={{ color: "#FFF" }}
            onClick={onDeleteClick}
          >
            刪除
          </button>
        </>
      )}
      trigger="hover"
    >
      {loading ? (
        <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
          {uploadButton}
        </div>
      ) : (
        // <Image
        //   src={thumb}
        //   width={104}
        //   height={104}
        //   style={{ marginRight: 8, marginBottom: 8 }}
        // ></Image>
        <MyVideo
          src={value}
          width={104}
          height={104}
          style={{ marginRight: 8, marginBottom: 8 }}
        ></MyVideo>
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
      const { url } = await uploadService.uploadVideo(file, (percent) => {
        onProgress({ percent }, file);
      });
      onSuccess({ url }, file);
    } catch (err) {
      onError(err);
    }
  }
  return (
    <>
      {value ? (
        imageButton
      ) : (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          // className="image-upload-grid"
          showUploadList={false}
          accept="video/*"
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

export default UploadVideo;
