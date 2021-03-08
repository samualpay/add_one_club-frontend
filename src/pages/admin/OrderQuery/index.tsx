import React, { useEffect, useState } from "react";

import "./index.css";
import MyTable from "./component/table";
import activityService from "../../../service/activity.service";
import MyForm from "./component/form";
import { OrderDto } from "../../../DTO/component/order";
import orderService from "../../../service/order.service";
import machineService from "../../../service/machine.service";
import { MachineDto } from "../../../DTO/component/machine";
import { ActivityDto } from "../../../DTO/component/activity";
import { OrderStatus } from "../../../enum/OrderStatus";
type OnFinshProps = {
  machineId?: number;
  activityId?: string;
  status?: OrderStatus;
};
function Admin() {
  const [datas, setDatas] = useState<OrderDto[]>([]);
  const [machineOptions, setMachineOptions] = useState<MachineDto[]>([]);
  const [activityOptions, setActivityOptions] = useState<ActivityDto[]>([]);
  const [finishProps, setFinishProps] = useState<OnFinshProps>();
  async function onSearch({ machineId, activityId, status }: OnFinshProps) {
    setFinishProps({ machineId, activityId, status });
    let result = await orderService.find({ machineId, activityId, status });
    setDatas(result);
  }
  async function refresh() {
    if (finishProps) {
      let result = await orderService.find(finishProps);
      setDatas(result);
    }
  }
  async function onPatch(id: number, status: OrderStatus) {
    await orderService.patch(id, status);
    await refresh();
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
      <MyTable datas={datas} onPatchClick={onPatch} />
    </div>
  );
}

export default Admin;
