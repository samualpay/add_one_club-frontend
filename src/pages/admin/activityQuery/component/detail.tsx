import { Button, Row, Col, Card, Descriptions, Progress, Table } from "antd";
import React, { useEffect } from "react";
import { ActivityDto } from "../../../../DTO/component/activity";
import "./detail.css";
import activityService from "../../../../service/activity.service";
const DATE_FORMAT = "YYYY-MM-DD HH:mm";
type ModifyModalProps = {
  data?: ActivityDto;
  onBack: () => void;
};
type FieldType = {
  title: string;
  value?: string | number | JSX.Element;
};
type ProgressProps = {
  percent: number;
};
type DiscountDTO = {
  level: number;
  peopleCount: number;
  percent: number;
};
function MyProgress({ percent }: ProgressProps) {
  return (
    <Progress
      type="circle"
      percent={percent}
      format={(percent) => `${percent}%`}
    />
  );
}
function ActivityQueryDetail({ data, onBack }: ModifyModalProps) {
  let fields: FieldType[] = [];
  let percentFields: FieldType[] = [];
  if (data) {
    let start_at = "";
    if (data.timeRange && data.timeRange.length >= 1) {
      // start_at = data.timeRange[0].format(DATE_FORMAT)
      start_at = data.timeRange[0].format(DATE_FORMAT);
    }
    let end_at = "";
    if (data.timeRange && data.timeRange.length >= 2) {
      end_at = data.timeRange[1].format(DATE_FORMAT);
    }
    let registerPercent = 0;
    if (data.linkCount && data.registeredCount) {
      registerPercent = Math.round(
        (data.registeredCount / data.linkCount) * 100
      );
    }
    let interestPercent = 0;
    if (data.buyCount && data.registeredCount) {
      interestPercent = Math.round(
        (data.buyCount / data.registeredCount) * 100
      );
    }
    let buyPercent = 0;
    if (data.buyCount && data.linkCount) {
      buyPercent = Math.round((data.buyCount / data.linkCount) * 100);
    }
    fields = [
      {
        title: "活動代碼",
        value: data.code,
      },
      {
        title: "產品名稱",
        value: data.name,
      },
      {
        title: "產品資訊",
        value: data.description,
      },
      {
        title: "活動時間",
        value: `${start_at} ~ ${end_at}`,
      },
      {
        title: "原價",
        value: data.price || "",
      },
      {
        title: "最新定價",
        value: activityService.getCurrentPrice(data),
      },
      {
        title: "感興趣人數",
        value: data.linkCount,
      },
      {
        title: "預定人數",
        value: data.registeredCount,
      },
      {
        title: "下單人數",
        value: data.buyCount,
      },

      {
        title: "活動點位數",
        value: data.publishCount,
      },
    ];
    percentFields = [
      {
        title: "預定百分比",
        value: <MyProgress percent={registerPercent} />,
      },
      {
        title: "興趣轉換率",
        value: <MyProgress percent={interestPercent} />,
      },
      {
        title: "預訂轉換率",
        value: <MyProgress percent={buyPercent} />,
      },
    ];
  }
  let discounts: DiscountDTO[] = [];
  if (data && data.discounts) {
    discounts = data.discounts.map((elem, index) => {
      return { level: index, ...elem };
    });
  }
  const columns = [
    {
      title: "層數",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "人數",
      dataIndex: "peopleCount",
      key: "peopleCount",
    },
    {
      title: "折扣",
      dataIndex: "percent",
      key: "percent",
    },
  ];
  return (
    <div>
      <Button onClick={onBack} type="primary">
        返回
      </Button>
      <div className="site-card-wrapper">
        <Descriptions
          title="活動資訊"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          {fields.map((elem, index) => (
            <Descriptions.Item key={index} label={elem.title}>
              {elem.value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </div>
      <div className="site-card-wrapper">
        <Row>
          <Col span={24}>
            <Card title="降價階層">
              <Table
                columns={columns}
                dataSource={discounts}
                rowKey="id"
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {percentFields.map((elem, index) => {
            return (
              <Col span={8} key={index}>
                <Card title={elem.title} style={{ textAlign: "center" }}>
                  {elem.value}
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
export default ActivityQueryDetail;
