import { Table, Tooltip } from "antd";
import React from "react";
import { Moment } from "moment";
import OrderDto from "../../../../DTO/component/order";
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
type TableProps = {
  datas: Array<OrderDto>;
};
function MyTable({ datas: outerDatas }: TableProps) {
  function getTimeFormat(timeRange: Moment[] | null): string {
    if (timeRange && timeRange.length === 2) {
      return `${timeRange[0].format(DATE_FORMAT)} ~ ${timeRange[1].format(
        DATE_FORMAT
      )}`;
    }
    return "";
  }
  const columns = [
    {
      title: "訂單代碼",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "廣告機代碼",
      dataIndex: "machine.id",
      render: (_: any, data: OrderDto) => (
        <Tooltip
          placement="top"
          title={
            <div>
              <div>
                <label>位置:</label>
                <span>
                  {data.publish.machine.city}
                  {data.publish.machine.dist}
                  {data.publish.machine.address}
                </span>
              </div>
              <div>
                <label>場域:</label>
                <span>{data.publish.machine.area}</span>
              </div>
              <div>
                <label>賣場屬性:</label>
                <span>{data.publish.machine.storeAttribute}</span>
              </div>
              <div>
                <label>廣告機類型:</label>
                <span>{data.publish.machine.machineType}</span>
              </div>
            </div>
          }
          trigger="hover"
        >
          <a>{data.publish.machine.id}</a>
        </Tooltip>
      ),
    },
    {
      title: "廣告代碼",
      dataIndex: "activity.id",
      render: (_: any, data: OrderDto) => (
        <Tooltip
          placement="top"
          title={
            <div>
              <div>
                <label>產品資訊:</label>
                <span>{data.publish.activity.description}</span>
              </div>
              <div>
                <label>活動起訖時間:</label>
                <span>{getTimeFormat(data.publish.activity.timeRange)}</span>
              </div>
              <div>
                <label>產品定價:</label>
                <span>{data.publish.activity.price}</span>
              </div>
            </div>
          }
          trigger="hover"
        >
          <a>{data.publish.activity.id}</a>
        </Tooltip>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, data: OrderDto) => <span>{data.user.email}</span>,
    },
    {
      title: "預購數量",
      dataIndex: "preCount",
      key: "preCount",
    },
    {
      title: "客戶",
      key: "name",
      render: (_: any, data: OrderDto) => <span>{data.user.name}</span>,
    },
    {
      title: "購買數量",
      dataIndex: "buyCount",
      key: "buyCount",
    },
    {
      title: "電話",
      key: "phone",
      render: (_: any, data: OrderDto) => <span>{data.user.phone}</span>,
    },
    {
      title: "地址",
      key: "address",
      render: (_: any, data: OrderDto) => <span>{data.user.address}</span>,
    },
    {
      title: "結帳金額",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "是否結帳",
      key: "status",
      render: (_: any, data: OrderDto) => (
        <span>{data.status === "preorder" ? "否" : "是"}</span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={outerDatas} rowKey="id" />;
}
export default MyTable;