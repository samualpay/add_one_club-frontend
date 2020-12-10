import React, { useEffect, useState } from "react";

import { Tabs } from "antd";
import "./index.css";
import MyTable from "./component/table";
import activityService from "../../../service/activity.service";
import MyForm from "./component/form";
import { PublishDto } from "../../../DTO/component/publish";
import machineService from "../../../service/machine.service";
import activityMachineService from "../../../service/activity.machine.service";
const { TabPane } = Tabs;

function Admin() {
  const [datas, setDatas] = useState<PublishDto[]>([]);
  const [machineOptions, setMachineOptions] = useState<
    { id: string | number; name: string }[]
  >([]);
  const [activityOptions, setActivityOptions] = useState<
    { id: string | number; name: string }[]
  >([]);
  async function machineQuery(id: number) {
    let publishs = await activityMachineService.findByMachine(id);
    setDatas(publishs);
  }
  async function activityQuery(id: number) {
    let publishs = await activityMachineService.findByActivity(id);
    setDatas(publishs);
  }
  function onSearch(type: "machine" | "activity") {
    if (type === "machine") {
      return machineQuery;
    } else {
      return activityQuery;
    }
  }
  async function findOptions() {
    let machines = await machineService.findAllMachines();
    let activitys = await activityService.findAll();
    setMachineOptions(
      machines.map((machine) => ({ id: machine.id, name: machine.code }))
    );
    setActivityOptions(
      activitys.map((activity) => ({ id: activity.id, name: activity.code }))
    );
  }
  useEffect(() => {
    findOptions();
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="廣告機查詢" key="1">
          <MyForm
            label="廣告機"
            options={machineOptions}
            onFinish={onSearch("machine")}
          />
        </TabPane>
        <TabPane tab="活動查詢" key="2">
          <MyForm
            label="活動"
            options={activityOptions}
            onFinish={onSearch("activity")}
          />
        </TabPane>
      </Tabs>

      <MyTable datas={datas} />
    </div>
  );
}

export default Admin;
