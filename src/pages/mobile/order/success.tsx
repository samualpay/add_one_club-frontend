import React, { useEffect, useState } from "react";
import { WhiteSpace, WingBlank, List, Card } from "antd-mobile";
import { useParams, useHistory } from "react-router-dom";
import orderService from "../../../service/order.service";
import { Carousel } from "react-responsive-carousel";

function OrderSuccess() {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [buyCount, setBuyCount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
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
      let images = order.publish.activity.images.map(
        (elem) => `/images/${elem}`
      );
      setImages(images);
      setProductName(order.publish.activity.name);
      setDescription(order.publish.activity.description);
      setFinalPrice(order.publish.activity.finalPrice + "");
      setBuyCount(order.buyCount + "");
      setTotalPrice(order.totalPrice + "");
      setName(order.customer.name + "");
      setPhone(order.customer.phone + "");
      setEmail(order.customer.email + "");
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
          <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true}>
            {images.map((image) => (
              <div>
                <img
                  style={{ width: "320px", height: "320px" }}
                  src={image}
                ></img>
              </div>
            ))}
          </Carousel>
        </List.Item>
        <List.Item>
          <h3 style={{ font: "bold 15px/18px Helvetica" }}>{productName}</h3>
        </List.Item>
      </List>
      <WhiteSpace />
      <Card>
        <Card.Header title="商品資訊" />
        <Card.Body>
          <div style={{ textAlign: "left", wordBreak: "break-word" }}>
            {description}
          </div>
        </Card.Body>
      </Card>
      <WhiteSpace />
      <List>
        <List.Item extra={finalPrice}>單價</List.Item>
        <List.Item extra={buyCount}>購買數量</List.Item>
        <List.Item extra={totalPrice}>總價</List.Item>
        <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
            客戶資料
          </div>
        </List.Item>
        <List.Item extra={name}>姓名</List.Item>
        <List.Item extra={email}>電子信箱</List.Item>
        <List.Item extra={address}>送貨地址</List.Item>
        <List.Item extra={staus}>訂單狀態</List.Item>
      </List>
    </WingBlank>
  );
}
export default OrderSuccess;
