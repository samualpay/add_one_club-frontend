import React, { useEffect, useState } from "react";
import { WhiteSpace, WingBlank, List, Card, Steps } from "antd-mobile";
import { useParams, useHistory } from "react-router-dom";
import orderService from "../../../service/order.service";
import { Carousel } from "react-responsive-carousel";
import "./detail.css";
import { OrderStatus } from "../../../enum/OrderStatus";
import { ActivityDto, DiscountDto } from "../../../DTO/component/activity";
import activityService from "../../../service/activity.service";
const Step = Steps.Step;
const orderStatus = [
  {
    key: "preorder",
    title: "預購",
  },
  {
    key: "paid",
    title: "已付款",
  },
  {
    key: "tally",
    title: "理貨",
  },
  {
    key: "shipment",
    title: "出貨",
  },
  {
    key: "finish",
    title: "訂單完成",
  },
];
function getOrderStatusIndex(status: OrderStatus) {
  return orderStatus.findIndex((elem) => {
    return elem.key === status;
  });
}
const steps = orderStatus.map((s, i) => <Step key={i} title={s.title} />);
function OrderDetail() {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activityId, setActivityId] = useState<number>();
  const [registeredCount, setRegisteredCount] = useState<number>();
  const [discounts, setDiscounts] = useState<DiscountDto[]>();
  const [price, setPrice] = useState<number>();
  const [preCount, setPreCount] = useState<number | null>();
  const [buyCount, setBuyCount] = useState<number | null>();
  const [name, setName] = useState<string | null>();
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string | null>();
  const [address, setAddress] = useState<string | null>();
  const [images, setImages] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>();
  const [finalPrice, setFinalPrice] = useState<number | null>();
  const [totalPrice, setTotalPrice] = useState<number | null>();
  const [step, setStep] = useState<number>(0);
  // function getCurrentPrice(act: ActivityDto) {
  //   let discounts = act.discounts;
  //   let price = act.price || 0;
  //   let finalPrice = price;
  //   discounts.forEach((discount) => {
  //     if (act.registeredCount && act.registeredCount > discount.peopleCount) {
  //       finalPrice = (price / 100) * discount.percent;
  //     }
  //   });
  //   return finalPrice;
  // }
  function payInfo() {
    return (
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
      </List>
    );
  }
  function preInfo() {
    return (
      <List>
        <List.Item extra={currentPrice}>當前價格</List.Item>
        <List.Item extra={preCount}>預購數量</List.Item>
        <List.Item extra={phone}>預購電話</List.Item>
      </List>
    );
  }
  function updateCurrentPrice() {
    setCurrentPrice(price || 0);
    if (price && registeredCount && discounts) {
      setCurrentPrice(
        activityService.getCurrentPrice({ registeredCount, price, discounts })
      );
    }
  }
  async function mount() {
    try {
      let order = await orderService.findByIdForMobile(parseInt(id));
      if (!order) {
        throw new Error("order not found");
      }
      let images = order.publish.activity.images.map(
        (elem) => `/images/${elem}`
      );
      const activity = order.publish.activity;
      setActivityId(activity.id);
      setRegisteredCount(activity.registeredCount);
      setDiscounts(activity.discounts);
      setPrice(activity.price || 0);
      setImages(images);
      setProductName(activity.name);
      setDescription(activity.description);
      setPhone(order.customer.phone + "");
      setStep(getOrderStatusIndex(order.status));
      if (order.status === "preorder") {
        setPreCount(order.preCount);
      } else {
        setFinalPrice(order.publish.activity.finalPrice);
        setBuyCount(order.buyCount);
        setTotalPrice(order.totalPrice);
        setName(order.customer.name);
        setEmail(order.customer.email + "");
        setAddress(order.customer.address + "");
      }
    } catch (err) {
      history.push("/notfound");
    }
  }
  useEffect(() => {
    mount();
  }, []);
  useEffect(() => {
    updateCurrentPrice();
  }, [price, registeredCount, discounts]);
  useEffect(() => {
    if (activityId != null) {
      let id = setInterval(async () => {
        let registeredCount = await activityService.getRegisteredCountById(
          activityId
        );
        setRegisteredCount(registeredCount);
      }, 10000);
      return () => clearInterval(id);
    }
  }, [activityId]);
  return (
    <WingBlank size="lg">
      <List>
        <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
            訂單資訊
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
      {step > 0 ? payInfo() : preInfo()}
      <WhiteSpace />
      <WingBlank className="stepsExample">
        <Steps current={step} direction="horizontal">
          {steps}
        </Steps>
      </WingBlank>
    </WingBlank>
  );
}
export default OrderDetail;
