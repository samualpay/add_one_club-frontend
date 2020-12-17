import { OrderDto, transfer } from "../DTO/component/order";
import moment from "moment";
import Axios from "axios";
import { OrderApiDto } from "../DTO/api/order";
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
    let response = await Axios.get<{ list: OrderApiDto[] }>("/api/orders", {
      params: { machineId, activityId, status },
    });
    let list = response.data.list;
    return list.map((elem) => transfer(elem));
  }
}

export default new OrderService();
