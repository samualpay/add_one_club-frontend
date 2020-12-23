import { PublishDto, transfer } from "../DTO/component/publish";
import axiosForAdmin from "../config/axiosForAdmin";
import { PublishApiDto } from "../DTO/api/publish";
import axiosForMobile from "../config/axiosForMobile";

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
  async findByIdForMobile(publishId: number): Promise<PublishDto | null> {
    let response = await axiosForMobile.axios.get<PublishApiDto>(
      `/api/mobile/publishs/${publishId}`
    );
    if (response.data) {
      return transfer(response.data);
    } else {
      return null;
    }
  }
}
export default new ActivityMachineService();
