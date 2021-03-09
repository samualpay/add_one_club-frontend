import React, { useState } from "react";

import "./index.css";
import MyTable from "./component/table";
import activityService from "../../../service/activity.service";
import MyForm from "./component/form";
import { ActivityDto } from "../../../DTO/component/activity";
import { ActivityStatus } from "../../../enum/ActivityStatus";
import ActivityQueryDetail from "./component/detail";
import activityMachineService from "../../../service/activity.machine.service";
type OnFinshProps = {
  status: ActivityStatus;
};
function Admin() {
  const [datas, setDatas] = useState<ActivityDto[]>([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [status, setStatus] = useState("start");
  const [detailData, setDetailData] = useState<ActivityDto>();
  async function onDetailClick(data: ActivityDto) {
    if (!data.publishCount) {
      let count = await activityMachineService.findCountByActivity(data.id);
      data.publishCount = count;
    }
    setDetailData(data);
    setDetailVisible(true);
  }
  async function onSearch({ status }: OnFinshProps) {
    setStatus(status.toString());
    let result = await activityService.findAll({ status });
    setDatas(result);
  }
  function onBack() {
    setDetailVisible(false);
  }
  return (
    <div>
      {detailVisible ? (
        <ActivityQueryDetail onBack={onBack} data={detailData} />
      ) : (
        <div>
          <MyForm onFinish={onSearch} status={status} />
          <MyTable datas={datas} onDetailClick={onDetailClick} />
        </div>
      )}
    </div>
  );
}

export default Admin;
