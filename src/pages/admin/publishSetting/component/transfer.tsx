import { Transfer } from "antd";
import React, { useEffect, useState } from "react";
import { MachineDto } from "../../../../DTO/component/machine";

type MyTransferPropsType = {
  datas: MachineDto[];
  targets: MachineDto[];
  onChange: (datas: MachineDto[]) => void;
};
type InnerDataType = {
  key: string;
  title: string;
};

function MachineTransfer({
  datas: outerDatas,
  targets,
  onChange,
}: MyTransferPropsType) {
  function transferDataObj(data: MachineDto): InnerDataType {
    return {
      key: data.id.toString(),
      title: data.code,
    };
  }
  function transferDataObjs(datas: MachineDto[]): InnerDataType[] {
    return datas.map((data) => transferDataObj(data));
  }
  const [datas, setDatas] = useState(transferDataObjs(outerDatas));
  const [targetKeys, setTargetKeys] = useState(
    targets.map((target) => target.id.toString())
  );
  useEffect(() => {
    setDatas(transferDataObjs(outerDatas));
  }, [outerDatas]);
  useEffect(() => {
    setTargetKeys(targets.map((target) => target.id.toString()));
  }, [targets]);
  function handleChange(targetKeys: string[]) {
    const selectDatas = outerDatas.filter((data) =>
      targetKeys.includes(data.id.toString())
    );
    onChange(selectDatas);
  }
  return (
    <Transfer
      dataSource={datas}
      titles={["未選定", "已選定"]}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => item.title}
      style={{ marginBottom: 16 }}
    />
  );
}
export default MachineTransfer;
