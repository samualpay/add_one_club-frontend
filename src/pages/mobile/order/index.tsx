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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
function Order() {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [buyCount, setBuyCount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
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
      let images = order.publish.activity.images.map(
        (elem) => `/images/${elem}`
      );
      setDescription(order.publish.activity.description);
      setImages(images);
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
      if (order.customer.email) {
        setEmail(order.customer.email);
      }
      if (order.customer.address) {
        setAddress(order.customer.address);
      }
    } catch (err) {
      history.push("/notfound");
    }
  }
  function handleOnChange(type: "buyCount" | "name" | "email" | "address") {
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
        case "email":
          setEmail(value);
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
        email,
        buyCount: parseInt(buyCount),
      });
      mount();
    }
  }
  function validForm() {
    if (!name || !address || !email || !buyCount) {
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
      <h2>訂單確認</h2>
      <List>
        {/* <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
            訂單確認
          </div>
        </List.Item> */}
        <List.Item>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              margin: "0px auto",
              maxWidth: "320px",
              position: "relative",
              overflow: "hidden",
            }}
          >
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
          </div>
        </List.Item>
        <List.Item>
          <h3 style={{ font: "bold 15px/18px Helvetica" }}>{description}</h3>
        </List.Item>
      </List>
      <WhiteSpace />
      <List>
        <List.Item extra={finalPrice}>單價</List.Item>
        <InputItem
          type="digit"
          clear
          placeholder="購買數量"
          value={buyCount}
          onChange={handleOnChange("buyCount")}
          autoFocus={true}
        >
          購買數量
        </InputItem>
        <List.Item extra={totalPrice}>總價</List.Item>
      </List>
      <WhiteSpace />
      <List>
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
          type="text"
          clear
          placeholder="電子信箱"
          value={email}
          onChange={handleOnChange("email")}
        >
          電子信箱
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
      <div style={{ height: "65px" }}></div>
      <div
        style={{
          width: "100%",
          height: "57px",
          borderTop: "1px solid #CCCCCC",
          background: "#F5F5F5",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "space-around",
          }}
        >
          <Button
            style={{ width: "120px", margin: "5px" }}
            type="primary"
            onClick={handleReadClick}
          >
            預購合約
          </Button>
          <Button
            style={{ width: "120px", margin: "5px" }}
            type="primary"
            disabled={!isRead}
            onClick={handleBuyClick}
          >
            訂購
          </Button>
        </div>
      </div>
    </WingBlank>
  );
}
export default Order;
