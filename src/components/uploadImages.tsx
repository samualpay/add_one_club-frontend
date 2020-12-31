import { Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  RcCustomRequestOptions,
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadFileStatus,
} from "antd/lib/upload/interface";
import uploadService from "../service/upload.service";
type valueProps = {
  fileName: string;
};
type UploadImagesProps = {
  urlPrefix?: string;
  value?: valueProps[];
  onChange?: (value: valueProps[]) => void;
};
type fileProps = {
  uid: string;
  name: string;
  status?: UploadFileStatus;
  url?: string;
  size: number;
  type: string;
  percent?: number;
};
function UploadImages({
  urlPrefix = "/images",
  value = [],
  onChange = () => {},
}: UploadImagesProps) {
  const [fileList, setFileList] = useState<fileProps[]>([]);
  const [uploadIndex, setUploadIndex] = useState<string>();
  function valueToFileList(value: valueProps, index: number): fileProps {
    debugger;
    return {
      uid: index.toString(),
      name: value.fileName,
      status: "done",
      url: `${urlPrefix}/${value.fileName}`,
      size: 0,
      type: "",
      percent: 0,
    };
  }
  function fileToValue(file: fileProps): valueProps {
    return {
      fileName: file.name,
    };
  }
  //   useEffect(() => {
  //     debugger;
  //     let files: fileProps[] = value.map((elem, index) => {
  //       return valueToFileList(elem, index);
  //     });
  //     setFileList(files);
  //   }, [value]);
  function beforeUpload(file: RcFile) {
    let tempFileList = [...fileList];
    tempFileList.push({
      uid: file.uid,
      name: "",
      status: "uploading",
      percent: 0,
      type: "",
      size: 0,
    });
    setUploadIndex(file.uid);
    setFileList(tempFileList);
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
  async function handleChange({
    file,
    fileList,
    event,
  }: UploadChangeParam<UploadFile<{ url: string }>>) {
    if (uploadIndex !== undefined) {
      let tempFileList = [...fileList];
      let index = tempFileList.findIndex((file) => file.uid === uploadIndex);
      if (index != -1) {
        if (file.status === "uploading") {
          //   setLoading(true);
          tempFileList[index].status = "uploading";
          if (event) {
            tempFileList[index].percent = event.percent;
            // setProgress(event.percent);
          }
          setFileList(tempFileList);
        }
        if (file.status === "done" && file.response) {
          debugger;
          setUploadIndex(undefined);
          tempFileList[index].fileName = file.response.url;
          onChange(tempFileList.map((file) => fileToValue(file)));
        }
        if (file.status === "error") {
          tempFileList[index].status = "error";
          tempFileList[index].percent = 0;
          setUploadIndex(undefined);
          setFileList(tempFileList);
          Modal.error({
            title: "上傳失敗",
          });
        }
      }
      // onChange(fileList.map((_file) => fileToValue(_file)));
      //console.log(info.file.status)
    }
  }
  async function handleRemove(file: UploadFile) {
    let tempFileList = [...fileList];
    tempFileList = tempFileList.filter((tempFile) => tempFile.uid !== file.uid);
    onChange(tempFileList.map((tempFile) => fileToValue(tempFile)));
  }

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
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        fileList={fileList}
        // onPreview={this.handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={beforeUpload}
      >
        {uploadIndex === undefined ? uploadButton : null}
      </Upload>
      {/* <Modal
        visible={previewVisible}
        footer={null}
        onCancel={this.handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal> */}
    </>
  );
}
export default UploadImages;
