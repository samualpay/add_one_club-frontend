import axiosForAdmin from "../config/axiosForAdmin";
import { ActivityApiDto, transfer as data2APIData } from "../DTO/api/activity";
import {
  ActivityDto,
  transfer as apiData2Data,
  DiscountDto,
} from "../DTO/component/activity";
import { ActivityStatus } from "../enum/ActivityStatus";
import axiosForMobile from "../config/axiosForMobile";
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
  async getRegisteredCountById(activityId: number) {
    let response = await axiosForMobile.axios.get<{ registeredCount: number }>(
      `/api/mobile/orders/activity/${activityId}/registeredCount`
    );
    return response.data.registeredCount;
  }
  getCurrentPrice({
    registeredCount,
    price,
    discounts,
  }: {
    registeredCount?: number;
    price: number | null;
    discounts?: DiscountDto[];
  }) {
    if (registeredCount && price && discounts) {
      let finalPrice = price;
      discounts.forEach((discount) => {
        if (registeredCount && registeredCount >= discount.peopleCount) {
          finalPrice = (price / 100) * discount.percent;
        }
      });
      return finalPrice;
    } else {
      let finalPrice = price || 0;
      return finalPrice;
    }
  }
}
export default new ActivityService();
