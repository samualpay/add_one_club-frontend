import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch,
  Redirect,
  useLocation

} from 'react-router-dom'
import activityMachineService from '../../../service/activity.machine.service';
import activityService from '../../../service/activity.service';
import machineService from '../../../service/machine.service';
import Data from '../machineSetting/type/data';
import MySelect from './component/select';
import MachineTransfer from './component/transfer';

import './index.css';

function Admin() {
  const [select,setSelect] = useState<string>('')
  const [options,setOptions] = useState<string[]>([])
  const [machines, setMachines] = useState<Data[]>([])
  const [targetMachines, setTargetMachines] = useState<Data[]>([])
  async function onMount(){
    const activitys = await activityService.findAll()
    const allMachines = await machineService.findAllMachines()
    if(activitys.length>0){
      const selected = activitys[0].id
      await handleSelectChange(selected)
    }
    setOptions(activitys.map(activity=>(activity.id)))
    setMachines(allMachines)
    
  }
  useEffect(()=>{
    onMount()
  },[])
  async function handleSelectChange(value:string){
    const targetMachines = await machineService.findMachinesByActivityId(value)
    setSelect(value)
    setTargetMachines(targetMachines)
  }
  async function handleTargetMachineChange(targetMachines: Data[]){
    setTargetMachines(targetMachines)
  }
  async function handleClick(){
    console.log(select,targetMachines.map(machine=>machine.id))
    await activityMachineService.bind(select,targetMachines.map(machine=>machine.id))
  }
  return (

    <div >
      <div>
      <label>廣告:</label>
      <MySelect options={options} onChange={handleSelectChange} value={select}/>
      </div>
      <div>
      <label>廣告機:</label>
      <MachineTransfer datas={machines} targets={targetMachines} onChange={handleTargetMachineChange}/>
      </div>
      <Button type="primary" onClick={handleClick}>儲存</Button>
    </div>
  );
}

export default Admin;
