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
import Login from './login'
import MachineSetting from './machineSetting'
import PublishQuery from './publishQuery'
import PublishSetting from './publishSetting'
import ShouldLoginRouter from '../../components/shouldLoginRouter'
import ShouldLogoutRouter from '../../components/shouldLogoutRouter'
import {useSelector,useDispatch}from 'react-redux'
import {RootState} from '../../redux'
import {logout as logoutAction} from '../../redux/modules/user'
function Admin() {
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
      {/* <header className="App-header">
      </header> */}
      <LoginButton />
      <Switch>
        <Route exact path={path}>
          <Redirect to={{ pathname: `${path}/activityQuery`, state: { from: location } }} />
        </Route>
        <ShouldLoginRouter path={`${path}/activityQuery`}>
          <ActivityQuery />
        </ShouldLoginRouter>
        <ShouldLoginRouter path={`${path}/activitySetting`}>
          <ActivitySetting />
        </ShouldLoginRouter>
        <ShouldLogoutRouter path={`${path}/login`}>
          <Login />
        </ShouldLogoutRouter>
        <ShouldLoginRouter path={`${path}/machineSetting`}>
          <MachineSetting />
        </ShouldLoginRouter>
        <ShouldLoginRouter path={`${path}/publishQuery`}>
          <PublishQuery />
        </ShouldLoginRouter>
        <ShouldLoginRouter path={`${path}/publishSetting`}>
          <PublishSetting />
        </ShouldLoginRouter>
      </Switch>
    </div>
  );
}

export default Admin;
