import { Transfer } from "antd"
import React, { useEffect, useState } from "react"
import Data from "../../machineSetting/type/data"


type MyTransferPropsType = {
    datas:Data[];
    targets: Data[];
    onChange: (datas: Data[])=> void
}
type InnerDataType = {
    key: string,
    title: string
}

function MachineTransfer({datas:outerDatas,targets,onChange}:MyTransferPropsType){
    function transferDataObj(data:Data):InnerDataType{
        return {
            key: data.id,
            title: data.id
        }
    }
    function transferDataObjs(datas: Data[]): InnerDataType[] {
        return datas.map(data => (transferDataObj(data)))
    }
    const [datas,setDatas] = useState(transferDataObjs(outerDatas))
    const [targetKeys,setTargetKeys] = useState(targets.map(target=>(target.id)))
    useEffect(()=>{setDatas(transferDataObjs(outerDatas))},[outerDatas])
    useEffect(()=>{setTargetKeys(targets.map(target=>(target.id)))},[targets])
    function handleChange(targetKeys:string[]){
        const selectDatas = outerDatas.filter(data => (targetKeys.includes(data.id)))
        onChange(selectDatas)
    }
    return (
        <Transfer
          dataSource={datas}
          titles={['未選定', '已選定']}
          targetKeys={targetKeys}
          onChange={handleChange}
          render={item => item.title}
          style={{ marginBottom: 16 }}
        />
    )
}
export default MachineTransfer