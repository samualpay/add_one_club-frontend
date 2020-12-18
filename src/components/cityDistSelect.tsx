import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import districts from "../config/taiwan_districts.json";
const { Option } = Select;
type ValueProps = {
  city?: string;
  dist?: string;
};
type Props = {
  value?: ValueProps;
  onChange?: (value: ValueProps) => void;
};
function findDistByCity(city: string): string[] {
  let temp = districts.filter((elem) => elem.name === city);
  if (temp.length > 0) {
    return temp[0].districts.map((district) => district.name);
  } else {
    return [];
  }
}
function CityDistSelect({ value = {}, onChange = (value) => {} }: Props) {
  const [city, setCity] = useState<string>();
  const [dist, setDist] = useState<string>();
  const [citys, setCitys] = useState<string[]>([]);
  const [dists, setDists] = useState<string[]>([]);
  function updateDists(city?: string) {
    let districts: string[] = [];
    if (city) {
      districts = findDistByCity(city);
    }
    setDists(districts);
    return districts;
  }
  function handleCityChange(city?: string) {
    let distTemp = dist;
    let districts = updateDists(city);
    if (districts.length > 0) {
      distTemp = districts[0];
    } else {
      distTemp = undefined;
    }
    onChange({ city, dist: distTemp });
  }
  function handleDistChange(dist?: string) {
    onChange({ city, dist });
  }
  useEffect(() => {
    setCity(value.city);
    setDist(value.dist);
  }, [value]);
  useEffect(() => {
    let citys = districts.map((elem) => {
      return elem.name;
    });
    setCitys(citys);
  }, []);
  useEffect(() => {
    updateDists(city);
  }, [city]);

  return (
    <Input.Group compact>
      <Select placeholder="縣市" value={city} onChange={handleCityChange}>
        {citys.map((elem, index) => (
          <Option value={elem} key={index}>
            {elem}
          </Option>
        ))}
      </Select>
      <Select placeholder="鄉鎮市區" value={dist} onChange={handleDistChange}>
        {dists.map((elem, index) => (
          <Option value={elem} key={index}>
            {elem}
          </Option>
        ))}
      </Select>
    </Input.Group>
  );
}
export default CityDistSelect;
