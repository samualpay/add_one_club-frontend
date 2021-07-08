import React, { useEffect, useState } from "react";
import moment from "moment";
import { Modal } from "antd";
import "./index.css";
import { ActivityDto } from "../../../DTO/component/activity";
import MyTable from "./component/table";
import ModifyModal from "./component/modifyModal";
import activityService from "../../../service/activity.service";
import MyForm from "./component/form";

function Admin() {
  const initalData: ActivityDto = {
    id: -1,
    code: "",
    images: [],
    videos: [],
    name: "",
    description: "",
    timeRange: null,
    payEndAt: moment(Date.now()),
    discounts: [],
    price: null,
    totalCount: undefined,
    finalPrice: null,
  };
  const [datas, setDatas] = useState<Array<ActivityDto>>([]);
  const [modalData, setModalData] = useState<ActivityDto>(initalData);
  const [modalShow, setModalShow] = useState(false);
  async function onAdd(data: ActivityDto, clearFn: () => void) {
    data.discounts = data.discounts.filter(
      (elem) => elem.peopleCount !== undefined && elem.percent !== undefined
    );
    console.log(data);
    await activityService.create(data);
    await findAll();
    clearFn();
  }
  function onDeleteClick(id: number) {
    Modal.confirm({
      title: "確認刪除",
      content: <p>{`確定要刪除活動[${id}]`}</p>,
      onOk: () => {
        onDeleteHandle(id);
      },
    });
  }
  async function onDeleteHandle(id: number) {
    await activityService.delete(id);
    findAll();
  }
  function onEndClick(id: number) {
    Modal.confirm({
      title: "確認停止",
      content: <p>{`確定要停止活動[${id}]`}</p>,
      onOk: () => {
        onEndHandle(id);
      },
    });
  }
  async function onEndHandle(id: number) {
    await activityService.end(id);
    findAll();
  }
  async function findAll() {
    let datas = await activityService.findAll();
    setDatas(datas);
  }
  function onModifyClick(data: ActivityDto) {
    setModalData({ ...data });
    showModal();
  }
  async function onModifyHandle(data: ActivityDto) {
    data.discounts = data.discounts.filter(
      (elem) => elem.peopleCount !== undefined && elem.percent !== undefined
    );
    await activityService.update(data);
    findAll();
    hideModal();
  }
  function showModal() {
    setModalShow(true);
  }
  function hideModal() {
    setModalShow(false);
  }
  useEffect(() => {
    findAll();
  }, []);

  return (
    <div>
      <MyForm onFinish={onAdd} />
      <MyTable
        datas={datas}
        onDeleteClick={onDeleteClick}
        onModifyClick={onModifyClick}
        onEndClick={onEndClick}
      />
      <ModifyModal
        data={modalData}
        visible={modalShow}
        onCancel={hideModal}
        onOK={onModifyHandle}
      />
    </div>
  );
}

export default Admin;
