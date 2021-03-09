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
  }
  async end(id: number) {
    await axiosForAdmin.axios.patch("/api/activitys/end", { id });
  }
  getCurrentPrice(act: ActivityDto) {
    let discounts = act.discounts;
    let price = act.price || 0;
    let finalPrice = price;
    discounts.forEach((discount) => {
      if (act.registeredCount && act.registeredCount > discount.peopleCount) {
        finalPrice = (price / 100) * discount.percent;
      }
    });
    return finalPrice;
  }
}
export default new ActivityService();
