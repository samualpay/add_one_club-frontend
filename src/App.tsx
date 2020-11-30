import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";

import Admin from "./pages/admin";
import Mobile from "./pages/mobile";
import NotFound from "./pages/notFound";
import Login from "./pages/admin/login";
import ShouldLoginRoute from "./components/shouldLoginRouter";
import ShouldLogoutRoute from "./components/shouldLogoutRouter";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Modal } from "antd";
import { RootState } from "./redux";
import axios from "axios";
import authService from "./service/auth.service";
import { show, dismiss } from "./redux/modules/loading";
import myAxios from "./config/myAxios";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.loading);
  useEffect(() => {
    myAxios.init(dispatch);
  }, []);

  return (
    <Spin spinning={isLoading > 0}>
      <Router>
        <Switch>
          <ShouldLogoutRoute path="/admin/login">
            <Login />
          </ShouldLogoutRoute>
          <ShouldLoginRoute path="/admin">
            <Admin />
          </ShouldLoginRoute>
          <Route path="/mobile" component={Mobile} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Spin>
  );
}

export default App;
