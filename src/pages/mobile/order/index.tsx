import React from "react";
import { Button, WhiteSpace, WingBlank, List, InputItem } from "antd-mobile";
import { useParams } from "react-router-dom";

function Order() {
  let { id } = useParams<{ id: string }>();
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
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://elt.rti.org.tw/wp-content/uploads/2020/06/960x540_learning-english-take-away-english-what-does-a-dog-mean-when-it-wags-its-tail-imagesgetty.jpg"
            ></img>
          </div>
        </List.Item>
        <InputItem type="digit" clear placeholder="購買數量">
          購買數量
        </InputItem>
        <List.Item>
          <div style={{ width: "100%", color: "#000000", textAlign: "center" }}>
            客戶資料填寫
          </div>
        </List.Item>
        <InputItem type="text" clear placeholder="姓名">
          姓名
        </InputItem>
        <InputItem type="number" clear placeholder="電話">
          電話
        </InputItem>
        <InputItem type="text" clear placeholder="送貨地址">
          送貨地址
        </InputItem>
      </List>
      <WhiteSpace />
      <Button type="primary">預購合約</Button>
      <WhiteSpace />
      <Button type="primary" disabled={true}>
        訂購
      </Button>
    </WingBlank>
  );
}
export default Order;
