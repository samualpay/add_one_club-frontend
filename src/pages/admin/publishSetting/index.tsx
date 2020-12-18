import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import activityMachineService from "../../../service/activity.machine.service";
import activityService from "../../../service/activity.service";
import publishService from "../../../service/activity.machine.service";
import machineService from "../../../service/machine.service";
import { MachineDto } from "../../../DTO/component/machine";
import { ActivityDto } from "../../../DTO/component/activity";
import { PublishDto } from "../../../DTO/component/publish";
import MySelect from "./component/select";
import MyTable from "./component/table";
import "./index.css";
import { ActivityStatus } from "../../../enum/ActivityStatus";
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
type ActivityOption = {
  id: number;
  code: string;
  description: string;
  startAt: string;
  endAt: string;
  price: string;
};
function activityDto2Option(dto: ActivityDto): ActivityOption {
  let startAt = "";
  let endAt = "";
  let price = dto.price ? dto.price.toString() : "";
  if (dto.timeRange && dto.timeRange.length === 2) {
    startAt = dto.timeRange[0].format(DATE_FORMAT);
    endAt = dto.timeRange[1].format(DATE_FORMAT);
  }
  return {
    startAt,
    endAt,
    id: dto.id,
    code: dto.code,
    description: dto.description,
    price,
  };
}
type MachineOption = {
  id: number;
  code: string;
  city: string;
  dist: string;
  address: string;
  area: string;
  storeAttribute: string;
  machineType: string;
};
function machineDto2Option(dto: MachineDto): MachineOption {
  let { city, dist } = dto.location;
  return { ...dto, city, dist };
}
const activityColumns = [
  {
    dataIndex: "code",
    title: "活動代碼",
  },
  {
    dataIndex: "description",
    title: "產品資訊",
  },
  {
    dataIndex: "startAt",
    title: "開始時間",
  },
  {
    dataIndex: "endAt",
    title: "結束時間",
  },
  {
    dataIndex: "price",
    title: "價格",
  },
];
const machineColumns = [
  {
    dataIndex: "code",
    title: "廣告機代碼",
  },
  {
    dataIndex: "city",
    title: "縣市",
  },
  {
    dataIndex: "dist",
    title: "鄉鎮市區",
  },
  {
    dataIndex: "address",
    title: "詳細地址",
  },
  {
    dataIndex: "area",
    title: "場域",
  },
  {
    dataIndex: "storeAttribute",
    title: "賣場屬性",
  },
  {
    dataIndex: "machineType",
    title: "廣告機類型",
  },
];
function Admin() {
  const [select, setSelect] = useState<number>();
  const [machineSelect, setMachineSelect] = useState<number>();
  const [options, setOptions] = useState<ActivityOption[]>([]);
  const [machineOptions, setMachineOptions] = useState<MachineOption[]>([]);
  const [machines, setMachines] = useState<MachineDto[]>([]);
  const [publishs, setPublishs] = useState<PublishDto[]>([]);
  async function onMount() {
    const activitys = await activityService.findAllWithoutStatus(
      ActivityStatus.END
    );
    const allMachines = await machineService.findAllMachines();
    setOptions(activitys.map((activity) => activityDto2Option(activity)));
    setMachines(allMachines);
    if (activitys.length > 0) {
      const selected = activitys[0].id;
      await handleSelectChange(selected);
    }
  }
  useEffect(() => {
    onMount();
  }, []);
  useEffect(() => {
    updateMachineOptions();
  }, [machines, publishs]);
  useEffect(() => {
    updateTable();
  }, [select]);
  async function updateTable() {
    if (select) {
      const publishs = await publishService.findByActivity(select);
      setPublishs(publishs);
    }
  }
  async function updateMachineOptions() {
    const publishMachineIds = publishs.map((elem) => elem.machine.id);
    const machineOptions = machines
      .filter((elem) => !publishMachineIds.includes(elem.id))
      .map((elem) => machineDto2Option(elem));
    setMachineOptions(machineOptions);
    const optionIds = machineOptions.map((elem) => elem.id);
    if (
      machineOptions.length > 0 &&
      machineSelect &&
      !optionIds.includes(machineSelect)
    ) {
      setMachineSelect(machineOptions[0].id);
    }
  }
  async function handleSelectChange(value: number) {
    setSelect(value);
  }
  async function handleMachineSelectChange(value: number) {
    setMachineSelect(value);
  }
  async function handleClick() {
    if (select && machineSelect) {
      await activityMachineService.bind(select, machineSelect);
      setMachineSelect(undefined);
      await updateTable();
    }
  }
  async function handlePublishClick(id: number, publish: boolean) {
    await publishService.publish(id, publish);
    await updateTable();
  }
  async function handlePublishAllClick() {
    if (select) {
      await publishService.publishByActivityId(select);
      await updateTable();
    }
  }
  async function handleDeleteClick(id: number) {
    await publishService.delete(id);
    await updateTable();
  }
  return (
    <div>
      <div>
        <label>活動代碼:</label>
        <MySelect<ActivityOption>
          options={options}
          onChange={handleSelectChange}
          value={select}
          columns={activityColumns}
        />
      </div>
      <div>
        <label>廣告機代碼:</label>
        <MySelect<MachineOption>
          options={machineOptions}
          onChange={handleMachineSelectChange}
          value={machineSelect}
          columns={machineColumns}
        />
      </div>
      <div>
        <Button type="primary" onClick={handleClick}>
          新增
        </Button>
      </div>
      <Row justify="space-around" align="middle">
        <Col span={20}>
          <MyTable
            datas={publishs}
            onPublishＣlick={handlePublishClick}
            onDeleteClick={handleDeleteClick}
          />
        </Col>
        <Col span={4}>
          <Button type="primary" size="large" onClick={handlePublishAllClick}>
            全部發布
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Admin;
