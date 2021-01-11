import { OrderDto, transfer } from "../DTO/component/order";
import axiosForAdmin from "../config/axiosForAdmin";
import { OrderApiDto } from "../DTO/api/order";
import axiosForMobile from "../config/axiosForMobile";

type FindProps = {
  machineId?: number;
  activityId?: string;
  status?: "preorder" | "paid" | "finish";
};
type BuyProps = {
  id: number;
  name: string;
  address: string;
  email: string;
  buyCount: number;
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
  async createForMobile(publishId: number, phone: string, preCount: number) {
    let response = await axiosForMobile.axios.post("/api/mobile/orders", {
      publishId,
      phone,
      preCount,
    });
    if (response.data) {
      return true;
    } else {
      return false;
    }
  }
  async buyForMobile({ id, name, address, email, buyCount }: BuyProps) {
    let response = await axiosForMobile.axios.patch("/api/mobile/orders/buy", {
      id,
      name,
      address,
      email,
      buyCount,
    });
    if (response.data) {
      return true;
    } else {
      return false;
    }
  }
}

export default new OrderService();
