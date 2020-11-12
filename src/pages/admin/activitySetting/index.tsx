import React from 'react';
import UploadImage from '../../../components/uploadImage'
import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch,
  Redirect,
  useLocation

} from 'react-router-dom'

import './index.css';

function Admin() {
  
  return (

    <div className="App">
      <header className="App-header">
        <h1>活動產品設定</h1>
        <UploadImage />
      </header>
    </div>
  );
}

export default Admin;
