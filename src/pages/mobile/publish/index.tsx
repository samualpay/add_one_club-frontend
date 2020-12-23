import React from "react";
import { Button, WhiteSpace, WingBlank, List, InputItem } from "antd-mobile";
import { useParams } from "react-router-dom";

function Publish() {
  let { id } = useParams<{ id: string }>();
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
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://elt.rti.org.tw/wp-content/uploads/2020/06/960x540_learning-english-take-away-english-what-does-a-dog-mean-when-it-wags-its-tail-imagesgetty.jpg"
            ></img>
          </div>
        </List.Item>
        <InputItem type="text" clear placeholder="請輸入Email">
          Email
        </InputItem>
        <InputItem
          type="digit"
          clear
          moneyKeyboardAlign="right"
          placeholder="請輸入數量"
        >
          數量
        </InputItem>
      </List>
      <WhiteSpace />
      <Button type="primary">預購</Button>
    </WingBlank>
  );
}
export default Publish;
