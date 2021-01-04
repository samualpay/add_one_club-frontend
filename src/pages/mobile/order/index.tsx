import React, { useEffect, useState } from "react";
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
  const [finalPrice, setFinalPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  async function mount() {
    try {
      let order = await orderService.findByIdForMobile(parseInt(id));
      if (!order) {
        throw new Error("order not found");
      }
      if (order.publish.activity.status != "end") {
        throw new Error("activity not end");
      }
      if (order.status !== "preorder") {
        history.push(`/mobile/order/finish/${id}`);
      }
      let image = `/images/${order.publish.activity.images[0]}`;
      setImage(image);
      setFinalPrice(order.publish.activity.finalPrice + "");
      setBuyCount(order.preCount + "");
      if (order.preCount && order.publish.activity.finalPrice) {
        setTotalPrice(
          (order.preCount * order.publish.activity.finalPrice).toString()
        );
      }
      if (order.customer.name) {
        setName(order.customer.name);
      }
      if (order.customer.phone) {
        setPhone(order.customer.phone);
      }
      if (order.customer.address) {
        setAddress(order.customer.address);
      }
    } catch (err) {
      history.push("/notfound");
    }
  }
  function handleOnChange(type: "buyCount" | "name" | "phone" | "address") {
    return function (value: string) {
      switch (type) {
        case "buyCount":
          if (value) {
            let buyCount = parseInt(value);
            let price = parseInt(finalPrice);
            setTotalPrice((buyCount * price).toString());
            setBuyCount(parseInt(value).toString());
          } else {
            setTotalPrice("");
            setBuyCount("");
          }
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
      mount();
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
  useEffect(() => {
    mount();
  }, []);

  return (
    <WingBlank size="lg">
      <List>
        <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
            訂單確認
          </div>
        </List.Item>
        <List.Item>
          <div style={{ width: "100%", textAlign: "center" }}>
            <img style={{ width: "100%", height: "auto" }} src={image}></img>
          </div>
        </List.Item>
        <List.Item extra={finalPrice}>單價</List.Item>
        <InputItem
          type="digit"
          clear
          placeholder="購買數量"
          value={buyCount}
          onChange={handleOnChange("buyCount")}
        >
          購買數量
        </InputItem>
        <List.Item extra={totalPrice}>總價</List.Item>
        <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
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
export default Order;
