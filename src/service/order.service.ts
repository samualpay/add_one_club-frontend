import { OrderDto, transfer } from "../DTO/component/order";
import axiosForAdmin from "../config/axiosForAdmin";
import { OrderApiDto } from "../DTO/api/order";
import axiosForMobile from "../config/axiosForMobile";

type FindProps = {
  machineId?: number;
  activityId?: string;
  status?: "preorder" | "paid" | "finish";
};
class OrderService {
  async find({
    machineId,
    activityId,
    status,
  }: FindProps): Promise<OrderDto[]> {
    let response = await axiosForAdmin.axios.get<{ list: OrderApiDto[] }>(
      "/api/orders",
      {
        params: { machineId, activityId, status },
      }
    );
    let list = response.data.list;
    return list.map((elem) => transfer(elem));
  }
  async findByIdForMobile(orderId: number) {
    let response = await axiosForMobile.axios.get<OrderApiDto>(
      `/api/mobile/orders/${orderId}`
    );
    return transfer(response.data);
  }
  async createForMobile(publishId: number, email: string, preCount: number) {
    let response = await axiosForMobile.axios.post("/api/mobile/orders", {
      publishId,
      email,
      preCount,
    });
    if (response.data) {
      return true;
    } else {
      return false;
    }
  }
}

export default new OrderService();
