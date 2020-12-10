import React, { useEffect, useState } from "react";

import "./index.css";
import MyTable from "./component/table";
import activityService from "../../../service/activity.service";
import MyForm from "./component/form";
import OrderDto from "../../../DTO/component/order";
import orderService from "../../../service/order.service";
import machineService from "../../../service/machine.service";
import { MachineDto } from "../../../DTO/component/machine";
import { ActivityDto } from "../../../DTO/component/activity";
type OnFinshProps = {
  machineId?: number;
  activityId?: string;
  status?: "preorder" | "paid" | "finish";
};
function Admin() {
  const [datas, setDatas] = useState<OrderDto[]>([]);
  const [machineOptions, setMachineOptions] = useState<MachineDto[]>([]);
  const [activityOptions, setActivityOptions] = useState<ActivityDto[]>([]);
  async function onSearch({ machineId, activityId, status }: OnFinshProps) {
    let result = await orderService.find({ machineId, activityId, status });
    setDatas(result);
  }
  async function findOptions() {
    let machines = await machineService.findAllMachines();
    let activitys = await activityService.findAll();
    setMachineOptions(machines);
    setActivityOptions(activitys);
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
