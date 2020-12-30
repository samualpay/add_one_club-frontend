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
import OrderSuccess from "./order/success";
import Publish from "./publish";

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
        <Route path={`${path}/publish/:id`}>
          <Publish />
        </Route>
        <Route path={`${path}/order/finish/:id`}>
          <OrderSuccess />
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
