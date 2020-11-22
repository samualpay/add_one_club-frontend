import { Space, Table } from "antd";
import React from "react";
import MyImage from "../../../../components/image";
import { ActivityDto } from "../../../../DTO/component/activity";
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";
type TableProps = {
  datas: Array<ActivityDto>;
  onModifyClick: (data: ActivityDto) => void;
  onDeleteClick: (id: string) => void;
  onEndClick?: (id: string) => void;
};
function MyTable({
  datas: outerDatas,
  onDeleteClick,
  onModifyClick,
  onEndClick,
}: TableProps) {
  const columns = [
    {
      title: "活動代碼",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "產品視覺圖",
      dataIndex: "imgUrl",
      render: (_: any, data: ActivityDto) => (
        <MyImage src={data.imgUrl} width={100} height={100} />
      ),
    },
    {
      title: "產品影片",
      dataIndex: "videoUrl",
      render: (_: any, data: ActivityDto) => (
        <MyImage src={data.videoUrl} width={100} height={100} />
      ),
    },
    {
      title: "產品資訊",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "活動開始時間",
      dataIndex: "start_at",
      render: (_: any, data: ActivityDto) => {
        let start_at = "";
        if (data.timeRange && data.timeRange.length >= 1) {
          // start_at = data.timeRange[0].format(DATE_FORMAT)
          start_at = data.timeRange[0].format(DATE_FORMAT);
        }
        return <p>{start_at}</p>;
      },
    },
    {
      title: "活動結束時間",
      dataIndex: "end_at",
      render: (_: any, data: ActivityDto) => {
        let end_at = "";
        if (data.timeRange && data.timeRange.length >= 2) {
          end_at = data.timeRange[1].format(DATE_FORMAT);
        }
        return <p>{end_at}</p>;
      },
    },
    {
      title: "產品定價",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "最終定價",
      dataIndex: "finalPrice",
      key: "finalPrice",
    },
    {
      title: "狀態",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "動作",
      dataIndex: "action",
      render: (_: any, data: ActivityDto) => (
        <Space size="middle">
          <a onClick={() => onModifyClick(data)}>修改</a>
          <a onClick={() => onDeleteClick(data.id)}>刪除</a>
          {onEndClick && data.status === "start" ? (
            <a onClick={() => onEndClick(data.id)}>停止</a>
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
