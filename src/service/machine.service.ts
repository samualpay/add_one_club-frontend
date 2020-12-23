// import Data from "../pages/admin/machineSetting/type/data";
import { MachineDto, transfer } from "../DTO/component/machine";
import { MachineApiDto, transfer as transfer2Api } from "../DTO/api/machine";
import axiosForAdmin from "../config/axiosForAdmin";
class MachineService {
  async findAllMachines(): Promise<MachineDto[]> {
    let response = await axiosForAdmin.axios.get<{ machines: MachineApiDto[] }>(
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
    await axiosForAdmin.axios.post("/api/machines", transfer2Api(data));
  }
  async updateMachine(data: MachineDto) {
    await axiosForAdmin.axios.put("/api/machines", transfer2Api(data));
  }
  async deleteMachine(id: number) {
    //todo delete machines api
    await axiosForAdmin.axios.delete(`/api/machines/${id}`);
  }
}
export default new MachineService();
