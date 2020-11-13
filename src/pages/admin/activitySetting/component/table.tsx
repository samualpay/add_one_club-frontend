import { Space, Table } from "antd";
import React from "react";
import Data from "../type/data";

type TableProps = {
    datas: Array<Data>;
    onModifyClick: (data: Data) => void;
    onDeleteClick: (id: string) => void;
}
function MyTable({datas:outerData,onDeleteClick,onModifyClick}:TableProps){
    const columns = [
      {
        title: '廣告代碼',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '縣市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '鄉鎮市區',
        dataIndex: 'dist',
        key: 'dist',
      },
      {
        title: '詳細地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '場域',
        dataIndex: 'area',
        key: 'area',
      },
      {
        title: '賣場屬性',
        dataIndex: 'storeAttribute',
        key: 'storeAttribute',
      },
      {
        title: '廣告機類型',
        dataIndex: 'machineType',
        key: 'machineType',
      },
      {
        title: '動作',
        dataIndex: "action",
        render: (_:any,data: Data) => (
          <Space size="middle">
            <a onClick={()=>onModifyClick(data)}>修改</a>
            <a onClick={()=>onDeleteClick(data.id)}>刪除</a>
          </Space>
        )
      }
    ];
    
    return (
      <Table columns={columns} dataSource={outerData} rowKey="id"/>
    )
  }
  export default MyTable