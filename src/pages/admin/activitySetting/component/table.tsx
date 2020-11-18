import { Space, Table,Image } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import MyImage from "../../../../components/image";
import Data from "../type/data";
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"
type TableProps = {
  datas: Array<Data>;
  onModifyClick: (data: Data) => void;
  onDeleteClick: (id: string) => void;
}
// type InnerDataType = {
//   id: string;
//   imgUrl: string;
//   videoUrl: string;
//   description: string;
//   start_at: string;
//   end_at: string;
//   price: number | null;
// }
function MyTable({ datas: outerDatas, onDeleteClick, onModifyClick }: TableProps) {
  // function outerData2Data(outerData:Data):InnerDataType{
  //   let start_at = ''
  //   let end_at = ''
  //   if(outerData.timeRange && outerData.timeRange.length === 2){
  //     start_at = outerData.timeRange[0].format()
  //     end_at = outerData.timeRange[1].format()
  //   }
  //   return {
  //     id: outerData.id,
  //     imgUrl: outerData.imgUrl,
  //     videoUrl: outerData.videoUrl,
  //     description: outerData.description,
  //     start_at: start_at,
  //     end_at: end_at,
  //     price: outerData.price
  //   }
  // }
  // function outerDatas2Datas(outerDatas:Data[]):InnerDataType[]{
  //   return outerDatas.map(outerData => (outerData2Data(outerData)))
  // }
  // function dataToOuterData(data:)
  // const [datas,setDatas] = useState(outerDatas2Datas(outerDatas))
  // useEffect(()=>{
  //   setDatas(outerDatas2Datas(outerDatas))
  // },outerDatas)
  const columns = [
    {
      title: '活動代碼',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '產品視覺圖',
      dataIndex: 'imgUrl',
      render: (_: any, data: Data)=>(<MyImage src={data.imgUrl} width={100} height={100} />)
    },
    {
      title: '產品影片',
      dataIndex: 'videoUrl',
      render: (_: any, data: Data)=>(<MyImage src={data.videoUrl} width={100} height={100} />)
    },
    {
      title: '產品資訊',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: '活動開始時間',
      dataIndex: 'start_at',
      render: (_: any, data: Data) => {
        let start_at = ''
        if (data.timeRange && data.timeRange.length >= 1) {
          // start_at = data.timeRange[0].format(DATE_FORMAT)
          start_at = data.timeRange[0].format(DATE_FORMAT)
        }
      return (<p>{start_at}</p>)
      }
    },
    {
      title: '活動結束時間',
      dataIndex: 'end_at',
      render: (_: any, data: Data) => {
        let end_at = ''
        if (data.timeRange && data.timeRange.length >= 2) {
          end_at = data.timeRange[1].format(DATE_FORMAT)
        }
      return (<p>{end_at}</p>)
      }
    },
    {
      title: '產品定價',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '動作',
      dataIndex: "action",
      render: (_: any, data: Data) => (
        <Space size="middle">
          <a onClick={() => onModifyClick(data)}>修改</a>
          <a onClick={() => onDeleteClick(data.id)}>刪除</a>
        </Space>
      )
    }
  ];

  return (
    <Table columns={columns} dataSource={outerDatas} rowKey="id" />
  )
}
export default MyTable