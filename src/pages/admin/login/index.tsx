import React,{useState} from 'react';
import {useDispatch} from 'react-redux'
import {login} from '../../../redux/modules/user'
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
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()
  function inputChange(type:string){
    return (ev:React.ChangeEvent<HTMLInputElement>):void=> {
      let value = ev.target.value
      switch(type){
        case 'username':
          setUsername(value);
          break;
        case 'password':
          setPassword(value);
          break;
      }
    }
  }
  function clickHandle():void {
    dispatch(login(username,password))
  }
  return (
    <div className="App">
      <h1>登入頁 </h1>
      <input placeholder="username" value={username} onChange={inputChange('username')} />
      <input placeholder="password" value={password} onChange={inputChange('password')} />
      <button onClick={clickHandle}>登入</button>
    </div>
  );
}

export default Admin;
