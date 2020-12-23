import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import "./index.css";
import Order from "./order";
import Publish from "./publish";

function Mobile() {
  let { path, url } = useRouteMatch();
  return (
    <div className="App">
      <Switch>
        <Route path={`${path}/publish/:id`}>
          <Publish />
        </Route>
        <Route path={`${path}/order/:id`}>
          <Order />
        </Route>
      </Switch>
    </div>
  );
}

export default Mobile;
