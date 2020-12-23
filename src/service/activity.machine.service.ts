import { PublishDto, transfer } from "../DTO/component/publish";
import axiosForAdmin from "../config/axiosForAdmin";
import { PublishApiDto } from "../DTO/api/publish";

class ActivityMachineService {
  async bind(activityId: number, machineId: number) {
    //todo: activityMachine bind api
    await axiosForAdmin.axios.post("/api/publishs", { activityId, machineId });
  }
  async findByMachine(machineId: number): Promise<PublishDto[]> {
    let response = await axiosForAdmin.axios.get<{ list: PublishApiDto[] }>(
      `/api/publishs/machine/${machineId}`
    );
    return response.data.list.map((elem) => transfer(elem));
  }
  async findByActivity(activityId: number): Promise<PublishDto[]> {
    let response = await axiosForAdmin.axios.get<{ list: PublishApiDto[] }>(
      `/api/publishs/activity/${activityId}`
    );
    return response.data.list.map((elem) => transfer(elem));
  }
  async delete(id: number) {
    await axiosForAdmin.axios.delete(`/api/publishs/${id}`);
  }
  async publish(id: number, publish: boolean) {
    await axiosForAdmin.axios.patch(`/api/publishs/${id}`, { publish });
  }
  async publishByActivityId(activityId: number) {
    await axiosForAdmin.axios.patch(`/api/publishs/activity/${activityId}`);
  }
}
export default new ActivityMachineService();
