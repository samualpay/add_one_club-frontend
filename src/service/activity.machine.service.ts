import { PublishDto, transfer } from "../DTO/component/publish";
import moment from "moment";
import Axios from "axios";
import { PublishApiDto } from "../DTO/api/publish";
class ActivityMachineService {
  async bind(activityId: number, machineId: number) {
    //todo: activityMachine bind api
    await Axios.post("/api/publishs", { activityId, machineId });
  }
  async findByMachine(machineId: number): Promise<PublishDto[]> {
    let response = await Axios.get<{ list: PublishApiDto[] }>(
      `/api/publishs/machine/${machineId}`
    );
    return response.data.list.map((elem) => transfer(elem));
  }
  async findByActivity(activityId: number): Promise<PublishDto[]> {
    let response = await Axios.get<{ list: PublishApiDto[] }>(
      `/api/publishs/activity/${activityId}`
    );
    return response.data.list.map((elem) => transfer(elem));
  }
  async delete(id: number) {
    await Axios.delete(`/api/publishs/${id}`);
  }
  async publish(id: number, publish: boolean) {
    await Axios.patch(`/api/publishs/${id}`, { publish });
  }
}
export default new ActivityMachineService();
