import React, { useState } from "react";
import {
  Button,
  WhiteSpace,
  WingBlank,
  List,
  InputItem,
  Toast,
} from "antd-mobile";
import { useParams, useHistory } from "react-router-dom";
import orderService from "../../../service/order.service";

function Order() {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [buyCount, setBuyCount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [status, setStatus] = useState("");
  async function mount() {
    try {
      let order = await orderService.findByIdForMobile(parseInt(id));
      if (!order) {
        throw new Error("order not found");
      }
      setStatus(order.status);
      let image = `/images/${order.publish.activity.imgUrl}`;
      setImage(image);
    } catch (err) {
      history.push("/notfound");
    }
  }
  function handleOnChange(type: "buyCount" | "name" | "phone" | "address") {
    return function (value: string) {
      switch (type) {
        case "buyCount":
          setBuyCount(value);
          break;
        case "name":
          setName(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "address":
          setAddress(value);
          break;
      }
    };
  }
  function handleReadClick() {
    setIsRead(true);
  }
  async function handleBuyClick() {
    if (validForm()) {
      await orderService.buyForMobile({
        id: parseInt(id),
        name,
        address,
        phone,
        buyCount: parseInt(buyCount),
      });
    }
  }
  function validForm() {
    if (!name || !address || !phone || !buyCount) {
      Toast.fail("請完整填寫");
      return false;
    }
    if (!buyCount || isNaN(parseInt(buyCount)) || parseInt(buyCount) < 1) {
      Toast.fail("請正確填寫購買數量");
      return false;
    }
    return true;
  }
  function PreorderView() {
    return (
      <WingBlank size="lg">
        <List>
          <List.Item>
            <div
              style={{ width: "100%", color: "#000000", textAlign: "center" }}
            >
              訂單確認
            </div>
          </List.Item>
          <List.Item>
            <div style={{ width: "100%", textAlign: "center" }}>
              <img style={{ width: "100%", height: "auto" }} src={image}></img>
            </div>
          </List.Item>
          <InputItem
            type="digit"
            clear
            placeholder="購買數量"
            value={buyCount}
            onChange={handleOnChange("buyCount")}
          >
            購買數量
          </InputItem>
          <List.Item>
            <div
              style={{ width: "100%", color: "#000000", textAlign: "center" }}
            >
              客戶資料填寫
            </div>
          </List.Item>
          <InputItem
            type="text"
            clear
            placeholder="姓名"
            value={name}
            onChange={handleOnChange("name")}
          >
            姓名
          </InputItem>
          <InputItem
            type="number"
            clear
            placeholder="電話"
            value={phone}
            onChange={handleOnChange("phone")}
          >
            電話
          </InputItem>
          <InputItem
            type="text"
            clear
            placeholder="送貨地址"
            value={address}
            onChange={handleOnChange("address")}
          >
            送貨地址
          </InputItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={handleReadClick}>
          預購合約
        </Button>
        <WhiteSpace />
        <Button type="primary" disabled={!isRead} onClick={handleBuyClick}>
          訂購
        </Button>
      </WingBlank>
    );
  }
  function PaidView() {
    return (
      <WingBlank size="lg">
        <List>
          <List.Item>
            <div
              style={{ width: "100%", color: "#000000", textAlign: "center" }}
            >
              訂單完成
            </div>
          </List.Item>
          <List.Item>
            <div style={{ width: "100%", textAlign: "center" }}>
              <img style={{ width: "100%", height: "auto" }} src={image} />
            </div>
          </List.Item>
        </List>
      </WingBlank>
    );
  }
  if (status === "preorder") {
    return <PreorderView />;
  } else if (status === "paid" || status === "finish") {
    return <PaidView />;
  } else {
    return <div></div>;
  }
}
export default Order;
