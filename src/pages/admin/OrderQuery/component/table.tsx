import { Table, Tooltip, Space } from "antd";
import React from "react";
import { Moment } from "moment";
import { OrderDto } from "../../../../DTO/component/order";
import { OrderStatus } from "../../../../enum/OrderStatus";
const DATE_FORMAT = "YYYY-MM-DD HH:mm";
type TableProps = {
  datas: Array<OrderDto>;
  onPatchClick: (id: number, status: OrderStatus) => void;
};
function MyTable({ datas: outerDatas, onPatchClick }: TableProps) {
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
                  {data.publish.machine.location.city}
                  {data.publish.machine.location.dist}
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
          <button className="link-button">{data.publish.machine.code}</button>
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
                <label>產品名稱:</label>
                <span>{data.publish.activity.name}</span>
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
          <button className="link-button">{data.publish.activity.code}</button>
        </Tooltip>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, data: OrderDto) => <span>{data.customer.email}</span>,
    },
    {
      title: "預購數量",
      dataIndex: "preCount",
      key: "preCount",
    },
    {
      title: "客戶",
      key: "name",
      render: (_: any, data: OrderDto) => <span>{data.customer.name}</span>,
    },
    {
      title: "購買數量",
      dataIndex: "buyCount",
      key: "buyCount",
    },
    {
      title: "電話",
      key: "phone",
      render: (_: any, data: OrderDto) => <span>{data.customer.phone}</span>,
    },
    {
      title: "地址",
      key: "address",
      render: (_: any, data: OrderDto) => <span>{data.customer.address}</span>,
    },
    {
      title: "結帳金額",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "狀態",
      key: "status",
      render: (_: any, data: OrderDto) => (
        <span>
          {data.status === "preorder"
            ? "預約"
            : data.status === "paid"
            ? "已付款"
            : data.status === "tally"
            ? "理貨"
            : data.status === "shipment"
            ? "出貨"
            : "已完成"}
        </span>
      ),
    },
    {
      title: "是否結帳",
      key: "status",
      render: (_: any, data: OrderDto) => (
        <span>{data.status === "preorder" ? "否" : "是"}</span>
      ),
    },
    {
      title: "動作",
      dataIndex: "action",
      render: (_: any, data: OrderDto) => (
        <Space size="middle">
          {data.status === "paid" ? (
            <button
              className="link-button"
              onClick={() => onPatchClick(data.id, "tally")}
            >
              更新狀態至理貨
            </button>
          ) : data.status === "tally" ? (
            <button
              className="link-button"
              onClick={() => onPatchClick(data.id, "shipment")}
            >
              更新狀態至出貨
            </button>
          ) : data.status === "shipment" ? (
            <button
              className="link-button"
              onClick={() => onPatchClick(data.id, "finish")}
            >
              更新狀態至訂單完成
            </button>
          ) : (
            <></>
          )}
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={outerDatas} rowKey="id" />;
}
export default MyTable;
