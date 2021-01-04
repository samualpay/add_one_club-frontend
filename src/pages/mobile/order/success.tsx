import React, { useEffect, useState } from "react";
import { WhiteSpace, WingBlank, List } from "antd-mobile";
import { useParams, useHistory } from "react-router-dom";
import orderService from "../../../service/order.service";

function OrderSuccess() {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [buyCount, setBuyCount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [staus, setStatus] = useState("");

  async function mount() {
    try {
      let order = await orderService.findByIdForMobile(parseInt(id));
      if (!order) {
        throw new Error("order not found");
      }
      if (order.status === "preorder") {
        history.push(`/mobile/order/${id}`);
      }
      let image = `/images/${order.publish.activity.images[0]}`;
      setImage(image);
      setFinalPrice(order.publish.activity.finalPrice + "");
      setBuyCount(order.buyCount + "");
      setTotalPrice(order.totalPrice + "");
      setName(order.customer.name + "");
      setPhone(order.customer.phone + "");
      setAddress(order.customer.address + "");
      if (order.status === "paid") {
        setStatus("待出貨");
      } else {
        setStatus("已出貨");
      }
    } catch (err) {
      history.push("/notfound");
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
            訂單確認
          </div>
        </List.Item>
        <List.Item>
          <div style={{ width: "100%", textAlign: "center" }}>
            <img style={{ width: "100%", height: "auto" }} src={image}></img>
          </div>
        </List.Item>
        <List.Item extra={finalPrice}>單價</List.Item>
        <List.Item extra={buyCount}>購買數量</List.Item>
        <List.Item extra={totalPrice}>總價</List.Item>
        <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
            客戶資料
          </div>
        </List.Item>
        <List.Item extra={name}>姓名</List.Item>
        <List.Item extra={phone}>電話</List.Item>
        <List.Item extra={address}>送貨地址</List.Item>
        <List.Item extra={staus}>訂單狀態</List.Item>
      </List>
      <WhiteSpace />

      {/* <Button type="primary" disabled={!isRead} onClick={handleBuyClick}>
        訂購
      </Button> */}
    </WingBlank>
  );
}
export default OrderSuccess;
