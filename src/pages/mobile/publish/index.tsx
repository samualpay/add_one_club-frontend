import React, { Children, useEffect, useState } from "react";
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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PhoneInputItem from "../../../components/mobile/phoneInputItem";
function Publish() {
  let { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [phoneHasError, setPhoneHasError] = useState<boolean>(false);
  const history = useHistory();
  function handlePhoneChange(value: string, hasError: boolean) {
    setPhone(value);
    setPhoneHasError(hasError);
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
        let images = publish.activity.images.map((elem) => `/images/${elem}`);
        setDescription(publish.activity.description);
        setImages(images);
      } else {
        throw new Error("not found");
      }
    } catch (err) {
      history.push("/notfound");
    }
  }
  async function handleClick() {
    if (phone && count && parseInt(count) > 0 && !phoneHasError) {
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
  }

  useEffect(() => {
    mount();
  }, []);

  return (
    <WingBlank size="lg">
      <h2>產品介紹</h2>
      <List>
        {/* <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
            產品介紹
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
        <PhoneInputItem
          value={phone}
          hasError={phoneHasError}
          onChange={handlePhoneChange}
          autoFocus={true}
        />

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
      <div style={{ height: "65px" }}></div>
      <div
        style={{
          width: "100%",
          height: "50px",
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            style={{ width: "120px", margin: "5px" }}
            type="primary"
            onClick={handleClick}
          >
            預購合約
          </Button>
          {/* <a
            style={{
              background: "#e40580",
              width: "120px",
              height: "40px",
              display: "block",
              color: "white",
              margin: "5px auto",
              textAlign: "center",
              font: "15px/40px Helvetica",
            }}
            href="javascript:void(0)"
            onClick={handleClick}
          >
            預購
          </a> */}
        </div>
      </div>
    </WingBlank>
  );
}
export default Publish;
