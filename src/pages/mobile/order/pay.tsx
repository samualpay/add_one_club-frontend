import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./pay.css";
function Pay() {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [time, setTime] = useState(3);
  useEffect(() => {
    setInterval(() => {
      setTime((time) => {
        if (time <= 0) {
          history.push(`/mobile/order/detail/${id}`);
        }
        return time - 1;
      });
    }, 1000);
  }, []);
  return (
    <div className="pay-card">
      <div className="space"></div>
      <div className="dd">
        <i className="checkmark">✓</i>
      </div>
      {/* <h1 className="pay-h1">付款成功</h1> */}
      <h1 className="pay-h1">訂購成功</h1>
      <p className="pay-p">{time}秒後自動跳轉</p>
    </div>
  );
}
export default Pay;
