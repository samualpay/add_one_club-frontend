import { ActivityIndicator } from "antd-mobile";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import axiosForMobile from "../../config/axiosForMobile";

import "./index.css";
import Order from "./order";
import OrderDetail from "./order/detail";
import Publish from "./publish";
import PublishSuccess from "./publish/success";
import Pay from "./order/pay";

function Mobile() {
  let { path, url } = useRouteMatch();
  let [loading, setLoading] = useState(0);
  function showLoading() {
    setLoading(loading + 1);
  }
  function dismissLoading() {
    setLoading(loading - 1);
  }
  axiosForMobile.init({ showLoading, dismissLoading });
  return (
    <div className="App">
      <Switch>
        <Route path={`${path}/publish/finish/:id`}>
          <PublishSuccess />
        </Route>
        <Route path={`${path}/publish/:id`}>
          <Publish />
        </Route>
        <Route path={`${path}/order/pay/:id`}>
          <Pay />
        </Route>
        <Route path={`${path}/order/detail/:id`}>
          <OrderDetail />
        </Route>
        <Route path={`${path}/order/:id`}>
          <Order />
        </Route>
      </Switch>
      <ActivityIndicator toast text="載入中..." animating={loading > 0} />
    </div>
  );
}

export default Mobile;
