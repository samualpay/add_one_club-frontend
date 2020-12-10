import { Table, Tooltip } from "antd";
import React from "react";
import MyImage from "../../../../components/image";
import { PublishDto } from "../../../../DTO/component/publish";
import { Moment } from "moment";
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
type TableProps = {
  datas: Array<PublishDto>;
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
    // {
    //   title: "廣告發布代碼",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "廣告機代碼",
      dataIndex: "machine.id",
      render: (_: any, data: PublishDto) => (
        // <MyImage src={data.imgUrl} width={100} height={100} />
        <Tooltip
          placement="top"
          title={
            <div>
              <div>
                <label>位置:</label>
                <span>
                  {data.machine.city}
                  {data.machine.dist}
                  {data.machine.address}
                </span>
              </div>
              <div>
                <label>場域:</label>
                <span>{data.machine.area}</span>
              </div>
              <div>
                <label>賣場屬性:</label>
                <span>{data.machine.storeAttribute}</span>
              </div>
              <div>
                <label>廣告機類型:</label>
                <span>{data.machine.machineType}</span>
              </div>
            </div>
          }
          trigger="hover"
        >
          <a>{data.machine.code}</a>
        </Tooltip>
      ),
    },
    {
      title: "廣告代碼",
      dataIndex: "activity.id",
      render: (_: any, data: PublishDto) => (
        // <MyImage src={data.imgUrl} width={100} height={100} />
        <Tooltip
          placement="top"
          title={
            <div>
              <div>
                <label>產品資訊:</label>
                <span>{data.activity.description}</span>
              </div>
              <div>
                <label>活動起訖時間:</label>
                <span>{getTimeFormat(data.activity.timeRange)}</span>
              </div>
              <div>
                <label>產品定價:</label>
                <span>{data.activity.price}</span>
              </div>
            </div>
          }
          trigger="hover"
        >
          <a>{data.activity.code}</a>
        </Tooltip>
      ),
    },
    {
      title: "網址",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "連線人數",
      dataIndex: "linkCount",
      key: "linkCount",
    },
    {
      title: "預定人數",
      dataIndex: "registeredCount",
      key: "registeredCount",
    },
  ];

  return <Table columns={columns} dataSource={outerDatas} rowKey="id" />;
}
export default MyTable;
