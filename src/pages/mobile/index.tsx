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

function Mobile() {
  
  return (

    <div className="App">
      <header className="App-header">
        <h1>Mobile</h1>
      </header>
    </div>
  );
}

export default Mobile;
