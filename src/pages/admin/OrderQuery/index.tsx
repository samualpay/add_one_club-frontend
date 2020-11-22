import React, { useEffect, useState } from "react";

import { Modal, Tabs } from "antd";
import "./index.css";
import MyTable from "./component/table";
import activityService from "../../../service/activity.service";
import MyForm from "./component/form";
import OrderDto from "../../../DTO/component/order";
import orderService from "../../../service/order.service";
import machineService from "../../../service/machine.service";

const { TabPane } = Tabs;
type OnFinshProps = {
  machineId?: string;
  activityId?: string;
  status?: "preorder" | "paid" | "finish";
};
function Admin() {
  const [datas, setDatas] = useState<OrderDto[]>([]);
  const [machineOptions, setMachineOptions] = useState<string[]>([]);
  const [activityOptions, setActivityOptions] = useState<string[]>([]);
  function showErrorMessage(message: string) {
    Modal.error({ title: "錯誤", content: message });
  }
  async function onSearch({ machineId, activityId, status }: OnFinshProps) {
    let result = await orderService.find({ machineId, activityId, status });
    setDatas(result);
  }
  async function findOptions() {
    let machines = await machineService.findAllMachines();
    let activitys = await activityService.findAll();
    setMachineOptions(machines.map((machine) => machine.id));
    setActivityOptions(activitys.map((activity) => activity.id));
  }
  useEffect(() => {
    findOptions();
  }, []);

  return (
    <div>
      <MyForm
        machineOptions={machineOptions}
        activityOptions={activityOptions}
        onFinish={onSearch}
      />
      <MyTable datas={datas} />
    </div>
  );
}

export default Admin;
