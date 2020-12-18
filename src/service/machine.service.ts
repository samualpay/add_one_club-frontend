// import Data from "../pages/admin/machineSetting/type/data";
import { MachineDto, transfer } from "../DTO/component/machine";
import { MachineApiDto, transfer as transfer2Api } from "../DTO/api/machine";
import axios from "axios";
class MachineService {
  async findAllMachines(): Promise<MachineDto[]> {
    let response = await axios.get<{ machines: MachineApiDto[] }>(
      "/api/machines"
    );
    return response.data.machines.map((elem) => transfer(elem));
  }
  // async findMachinesByActivityId(activtyId: number) {
  //   //todo get machines by activity
  //   fakeCount++;
  //   if (fakeCount > 3) {
  //     fakeCount = 0;
  //   }
  //   return fakeData.filter((_, index) => index % fakeCount === 0);
  // }
  async createMachine(data: MachineDto) {
    await axios.post("/api/machines", transfer2Api(data));
  }
  async updateMachine(data: MachineDto) {
    await axios.put("/api/machines", transfer2Api(data));
  }
  async deleteMachine(id: number) {
    //todo delete machines api
    await axios.delete(`/api/machines/${id}`);
  }
}
export default new MachineService();
