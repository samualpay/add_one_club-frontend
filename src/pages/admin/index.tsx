import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch,
  Redirect,
  useLocation,
  useRouteMatch

} from 'react-router-dom'

import './index.css';

import ActivityQuery from './activityQuery'
import ActivitySetting from './activitySetting'
import Login from './login'
import MachineSetting from './machineSetting'
import PublishQuery from './publishQuery'
import PublishSetting from './publishSetting'
function Admin() {
  let {path,url} = useRouteMatch();
  return (

    <div className="App">
        <h1>Admin</h1>
      {/* <header className="App-header">
        
      </header> */}
      <Switch>
          <Route exact path = {path}>
                <h3>Please select a page</h3>
          </Route>
          <Route path={`${path}/activityQuery`}>
          <ActivityQuery />
        </Route>
        <Route path={`${path}/activitySetting`}>
          <ActivitySetting />
        </Route>
        <Route path={`${path}/login`}>
          <Login />
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

export default Admin;
