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
import { Form } from 'antd';

function Admin() {
  return (

    <div className="App">
      <header className="App-header">
        <h1>活動產品設定</h1>
        <Form
          initialValues={{
            ['upload']: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }}
        >
          <Form.Item
            name="upload"
          >
            <UploadImage />
          </Form.Item>
        </Form>

      </header>
    </div>
  );
}

export default Admin;
