import React, { useEffect, useState } from "react";
import UploadVideo from "./uploadVideo";

type UploadImagesProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
};
type fileProps = {
  uid: string;
  fileName: string;
};
function UploadImages({ value, onChange }: UploadImagesProps) {
  const [fileList, setFileList] = useState<fileProps[]>([]);
  function valueToFileList(value: string): fileProps {
    let uid = value;
    return {
      uid,
      fileName: value,
    };
  }
  function filesToValues(files: fileProps[]): string[] {
    return files.map((elem) => fileToValue(elem));
  }
  function fileToValue(file: fileProps): string {
    return file.fileName;
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
        if (!files.includes(elem)) {
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
        <UploadVideo
          value={elem.fileName}
          key={index}
          onChange={handleOnUpdate(elem.uid)}
          onDelete={handleRemove(elem.uid)}
        />
      ))}
      <UploadVideo onChange={handleOnInsert} />
    </>
  );
}
export default UploadImages;
