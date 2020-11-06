import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
  useRouteMatch,
  useHistory,
  RouteProps

} from 'react-router-dom'

import './index.css';

import ActivityQuery from './activityQuery'
import ActivitySetting from './activitySetting'
// import Login from './login'
import MachineSetting from './machineSetting'
import PublishQuery from './publishQuery'
import PublishSetting from './publishSetting'
import ShouldLoginRouter from '../../components/shouldLoginRouter'
import ShouldLogoutRouter from '../../components/shouldLogoutRouter'
import {useSelector,useDispatch}from 'react-redux'
import {RootState} from '../../redux'
//antd
import {logout as logoutAction} from '../../redux/modules/user'
import {Layout,Menu,Breadcrumb} from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
// antd
function Pages() {
  let { path, url } = useRouteMatch();
  let location = useLocation()
  let history = useHistory();
  let {isLogin,username} = useSelector((state: RootState)=>(state.user))
  let dispatch = useDispatch()
  function logout() {
    dispatch(logoutAction())
    history.push(`${url}`)
  }
  function LoginButton() {
    return isLogin ? (
      <a
        onClick={logout}
      >登出</a>
    ) : (
        <Link to={`${url}/login`}>登入</Link>
      );
  }


  return (
    <div className="App">
      <h1>Admin</h1>
      <LoginButton />
      <Switch>
        <Route exact path={path}>
          <Redirect to={{ pathname: `${path}/activityQuery`, state: { from: location } }} />
        </Route>
        <Route path={`${path}/activityQuery`}>
          <ActivityQuery />
        </Route>
        <Route path={`${path}/activitySetting`}>
          <ActivitySetting />
        </Route>
        <Route path={`${path}/machineSetting`}>
          <MachineSetting />
        </Route>
        <Route path={`${path}/publishQuery`}>
          <PublishQuery />
        </Route>
        <Route path={`${path}/publishSetting`}>
          <PublishSetting />
        </Route>
      </Switch>
    </div>
  );
}
function Admin(){

}

export default Pages;
