import React, { useEffect, useState } from "react";
import {
  Button,
  WhiteSpace,
  WingBlank,
  List,
  InputItem,
  Toast,
} from "antd-mobile";
import { useHistory, useParams } from "react-router-dom";
import activityMachineService from "../../../service/activity.machine.service";
import orderService from "../../../service/order.service";

function Publish() {
  let { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState("");
  const [image, setImage] = useState<string>();
  const history = useHistory();
  function handlePhoneChange(value: string) {
    setPhone(value);
  }
  function handleCountChange(value: string) {
    setCount(value);
  }
  async function mount() {
    try {
      let publish = await activityMachineService.findByIdForMobile(
        parseInt(id)
      );
      if (publish) {
        let image = `/images/${publish.activity.images[0]}`;
        setImage(image);
      } else {
        throw new Error("not found");
      }
    } catch (err) {
      history.push("/notfound");
    }
  }
  async function handleClick() {
    let result = await orderService.createForMobile(
      parseInt(id),
      phone,
      parseInt(count)
    );
    if (result) {
      Toast.success("預購成功");
      setCount("");
    }
  }

  useEffect(() => {
    mount();
  }, []);

  return (
    <WingBlank size="lg">
      <List>
        <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
            產品介紹
          </div>
        </List.Item>
        <List.Item>
          <div style={{ width: "100%", textAlign: "center" }}>
            <img style={{ width: "100%", height: "auto" }} src={image}></img>
          </div>
        </List.Item>
        <InputItem
          type="text"
          clear
          placeholder="請輸入手機號碼"
          onChange={handlePhoneChange}
          value={phone}
        >
          手機號碼
        </InputItem>
        <InputItem
          type="digit"
          clear
          moneyKeyboardAlign="right"
          placeholder="請輸入數量"
          onChange={handleCountChange}
          value={count}
        >
          數量
        </InputItem>
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={handleClick}>
        預購
      </Button>
    </WingBlank>
  );
}
export default Publish;
