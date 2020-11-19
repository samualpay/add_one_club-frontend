import Data from "../pages/admin/machineSetting/type/data";
const fakeData:Data[] = [{id:'111',city:'Zhejiang',dist:'Zhejiang',address:'111',area:'百貨公司',machineType:'戶外大型廣告面板',storeAttribute:'都會型商圈'}]
let fakeCount:number = 0
class MachineService {
    async findAllMachines():Promise<Data[]>{
        //todo get machines api
        return fakeData
    }
    async findMachinesByActivityId(activtyId:string){
        //todo get machines by activity
        fakeCount ++
        if(fakeCount>3){
            fakeCount = 0
        }
        return fakeData.filter((_,index)=>(index % fakeCount === 0))
    }
    async createMachine(data:Data):Promise<Data>{
        //todo post machines api
        if(!fakeData.some((item)=>item.id===data.id)){
            fakeData.push(data)
            return data
        }else {
            throw new Error('id 重複')
        }
        
        
    }
    async updateMachine(data:Data):Promise<Data>{
        //todo put machines api
        const index = fakeData.findIndex(item => item.id === data.id)
        if(index >= 0){
            fakeData[index] = data
            return data
        }else{
            throw new Error('id not found')
        }
    }
    async deleteMachine(id:string){
        //todo delete machines api
        const index = fakeData.findIndex(item => item.id === id)
        if(index >= 0){
            fakeData.splice(index,1)
        }else{
            throw new Error('id not found')
        }
    }
}
export default new MachineService()