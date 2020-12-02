// import Data from "../pages/admin/machineSetting/type/data";
import { MachineDto as Data } from "../DTO/component/machine";
import axios from "axios";
const fakeData: Data[] = [
  {
    id: 1,
    code: "111",
    city: "Zhejiang",
    dist: "Zhejiang",
    address: "111",
    area: "百貨公司",
    machineType: "戶外大型廣告面板",
    storeAttribute: "都會型商圈",
  },
];
let fakeCount: number = 0;
class MachineService {
  async findAllMachines(): Promise<Data[]> {
    let response = await axios.get<{ machines: Data[] }>("/api/machines");
    return response.data.machines;
  }
  async findMachinesByActivityId(activtyId: string) {
    //todo get machines by activity
    fakeCount++;
    if (fakeCount > 3) {
      fakeCount = 0;
    }
    return fakeData.filter((_, index) => index % fakeCount === 0);
  }
  async createMachine(data: Data) {
    await axios.post("/api/machines", data);
  }
  async updateMachine(data: Data) {
    await axios.put("/api/machines", data);
  }
  async deleteMachine(id: number) {
    //todo delete machines api
    await axios.delete(`/api/machines/${id}`);
  }
}
export default new MachineService();
