import React, { useState } from "react";

import "./index.css";
import MyTable from "./component/table";
import activityService from "../../../service/activity.service";
import MyForm from "./component/form";
import { ActivityDto } from "../../../DTO/component/activity";
import { ActivityStatus } from "../../../enum/ActivityStatus";
type OnFinshProps = {
  status?: ActivityStatus;
};
function Admin() {
  const [datas, setDatas] = useState<ActivityDto[]>([]);
  async function onDetailClick(data: ActivityDto) {
    console.log(data);
  }
  async function onSearch({ status }: OnFinshProps) {
    let result = await activityService.findAll({ status });
    setDatas(result);
  }

  return (
    <div>
      <MyForm onFinish={onSearch} />
      <MyTable datas={datas} onDetailClick={onDetailClick} />
    </div>
  );
}

export default Admin;
