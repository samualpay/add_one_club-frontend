import { Select, List, Card } from "antd";

import React, { useEffect, useState } from "react";
const { Option } = Select;
type BaseT = {
  id: string | number;
  code: string;
  [key: string]: string | number;
};
type ColumnType = {
  dataIndex: string;
  title: string;
};
type listItemType = {
  title: string;
  content: string | number;
};
type MySelectPropsType<T extends BaseT> = {
  // options: { id: number; name: string; props: object }[];
  options: T[];
  onChange?: (value: number) => void;
  value?: number;
  columns: ColumnType[];
};
function MySelect<T extends BaseT>({
  options,
  onChange,
  columns,
  value,
}: MySelectPropsType<T>) {
  const [data, setData] = useState<listItemType[]>([]);
  function findDataById(id: number) {
    const datas = options.filter((elem) => elem.id === id);
    if (datas.length > 0) {
      return datas[0];
    } else {
      return undefined;
    }
  }
  function trans(data: T) {
    const result: listItemType[] = [];
    columns.forEach((column) => {
      let key = column.dataIndex;
      if (data[key] !== undefined) {
        result.push({ title: column.title, content: data[key] });
      }
    });
    return result;
  }
  function onChangeHandle(value: number) {
    let data = findDataById(value);
    if (data) {
      setData(trans(data));
    }
    if (onChange) {
      onChange(value);
    }
  }
  useEffect(() => {
    if (value) {
      onChangeHandle(value);
    }
  }, [value]);
  return (
    <>
      <Select style={{ width: 120 }} onChange={onChange} value={value}>
        {options.map((option, index) => (
          <Option value={option.id} key={index}>
            {option.code}
          </Option>
        ))}
      </Select>
      <List
        grid={{
          xs: 1,
          sm: 2,
          md: 4,
          lg: 6,
          xl: 8,
          xxl: 10,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>{item.content}</Card>
          </List.Item>
        )}
      />
    </>
  );
}
export default MySelect;
