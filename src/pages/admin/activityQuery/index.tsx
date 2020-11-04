import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch,
  Redirect,
  useLocation

} from 'react-router-dom'

import './index.css';

function ActivityQuery() {
  
  return (

    <div className="App">
      <header className="App-header">
        <h1>活動產品查詢</h1>
      </header>
    </div>
  );
}

export default ActivityQuery;
