import axiosForAdmin from "../config/axiosForAdmin";
import { ActivityApiDto, transfer as data2APIData } from "../DTO/api/activity";
import {
  ActivityDto,
  transfer as apiData2Data,
} from "../DTO/component/activity";
import { ActivityStatus } from "../enum/ActivityStatus";
class ActivityService {
  async findAll(
    query: { status?: ActivityStatus } = {}
  ): Promise<ActivityDto[]> {
    let response = await axiosForAdmin.axios.get<{ list: ActivityApiDto[] }>(
      "/api/activitys",
      {
        params: query,
      }
    );
    let list = response.data.list;
    return list.map((elem) => apiData2Data(elem));
  }
  async findAllWithoutStatus(status: ActivityStatus): Promise<ActivityDto[]> {
    let response = await axiosForAdmin.axios.get<{ list: ActivityApiDto[] }>(
      "/api/activitys/withoutStatus",
      {
        params: { status },
      }
    );
    let list = response.data.list;
    return list.map((elem) => apiData2Data(elem));
  }
  async create(data: ActivityDto) {
    const item = data2APIData(data);
    await axiosForAdmin.axios.post("/api/activitys", item);
  }
  async update(data: ActivityDto) {
    const item = data2APIData(data);
    await axiosForAdmin.axios.put("/api/activitys", item);
  }
  async delete(id: number) {
    await axiosForAdmin.axios.delete(`/api/activitys/${id}`);
    // const index = fakeData.findIndex(item => item.id === id)
    // if (index >= 0) {
    //   fakeData.splice(index, 1)
    // } else {
    //   throw new Error('id not found')
    // }
  }
  async end(id: number) {
    // const index = fakeData.findIndex(item => item.id === id)
    // if (index >= 0) {
    //   fakeData[index].status = "end"
    // } else {
    //   throw new Error('id not found')
    // }
  }
}
export default new ActivityService();
