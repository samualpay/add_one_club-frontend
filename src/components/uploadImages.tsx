import React, { useEffect, useState } from "react";
import UploadImage from "./uploadImage";
type valueProps = {
  uid?: string;
  fileName: string;
};
type UploadImagesProps = {
  value?: valueProps[];
  onChange?: (value: valueProps[]) => void;
};
type fileProps = {
  uid: string;
  fileName: string;
};
function UploadImages({ value, onChange }: UploadImagesProps) {
  const [fileList, setFileList] = useState<fileProps[]>([]);
  function valueToFileList(value: valueProps): fileProps {
    let uid = value.fileName;
    if (value.uid) {
      uid = value.uid;
    }
    return {
      uid,
      fileName: value.fileName,
    };
  }
  function filesToValues(files: fileProps[]): valueProps[] {
    return files.map((elem) => fileToValue(elem));
  }
  function fileToValue(file: fileProps): valueProps {
    return {
      uid: file.uid,
      fileName: file.fileName,
    };
  }
  useEffect(() => {
    console.log(value);
    if (value && checkDiff()) {
      let files: fileProps[] = value.map((elem, index) => {
        return valueToFileList(elem);
      });
      setFileList(files);
    }
  }, [value]);
  function checkDiff() {
    if (!value) {
      return false;
    } else {
      if (value.length !== fileList.length) {
        return true;
      }
      let result = false;
      let files = fileList.map((elem) => elem.fileName);
      value.forEach((elem) => {
        if (!files.includes(elem.fileName)) {
          result = true;
        }
      });
      return result;
    }
  }
  function handleOnUpdate(uid: string) {
    return (value: string) => {
      let tempFileList = [...fileList];
      let index = tempFileList.findIndex((elem) => elem.uid === uid);
      tempFileList[index].fileName = value;
      updateFileList(tempFileList);
    };
  }
  function handleOnInsert(value: string) {
    let tempFileList = [...fileList];
    tempFileList.push({ uid: value, fileName: value });
    updateFileList(tempFileList);
  }
  function handleRemove(uid: string) {
    return () => {
      let tempFileList = [...fileList];
      tempFileList = tempFileList.filter((tempFile) => tempFile.uid !== uid);
      updateFileList(tempFileList);
    };
  }
  function updateFileList(fileList: fileProps[]) {
    setFileList(fileList);
    if (onChange) {
      onChange(filesToValues(fileList));
    }
  }
  return (
    <>
      {fileList.map((elem, index) => (
        <UploadImage
          value={elem.fileName}
          key={index}
          onChange={handleOnUpdate(elem.uid)}
          onDelete={handleRemove(elem.uid)}
        />
      ))}
      <UploadImage onChange={handleOnInsert} />
    </>
  );
}
export default UploadImages;
