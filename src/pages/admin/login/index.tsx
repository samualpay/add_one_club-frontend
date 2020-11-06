import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../../../redux/modules/user'
import { 
  useHistory,
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch,
  Redirect,
  useLocation

} from 'react-router-dom'

import './index.css';
import { RootState } from '../../../redux';

function Admin() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
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
  async function clickHandle() {
    dispatch(login(username,password,(result => {
      if(result){
        history.push('/admin')
      }else{
        console.log('failed')
      }
    })))
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
