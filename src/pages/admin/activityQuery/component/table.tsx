import { Space, Table } from "antd";
import React from "react";
import MyImage from "../../../../components/image";
import { ActivityDto } from "../../../../DTO/component/activity";
import MyVideo from "../../../../components/video";
import { ActivityStatusTranslationMap } from "../../../../enum/ActivityStatus";
const DATE_FORMAT = "YYYY-MM-DD HH:mm";
type TableProps = {
  datas: Array<ActivityDto>;
  onDetailClick: (data: ActivityDto) => void;
};
function MyTable({ onDetailClick, datas: outerDatas }: TableProps) {
  const columns = [
    {
      title: "活動代碼",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "產品視覺圖",
      dataIndex: "images",
      render: (_: any, data: ActivityDto) => (
        <MyImage src={data.images[0]} width={100} height={100} />
      ),
    },
    {
      title: "產品名稱",
      dataIndex: "name",
      key: "name",
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
      render: (_: any, data: ActivityDto) => {
        let text = "";
        if (data.status) {
          text = ActivityStatusTranslationMap[data.status];
        }
        return <p>{text}</p>;
      },
    },
    {
      title: "動作",
      dataIndex: "action",
      render: (_: any, data: ActivityDto) => (
        <Space size="middle">
          <button className="link-button" onClick={() => onDetailClick(data)}>
            詳細
          </button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={outerDatas} rowKey="id" />;
}
export default MyTable;
