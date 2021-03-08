import { PublishApiDto } from "./publish";
import { CustomerDto } from "../customerDto";
import { OrderStatus } from "../../enum/OrderStatus";

export type OrderApiDto = {
  id: number;
  publish: PublishApiDto;
  customer: CustomerDto;
  preCount: number | null;
  buyCount: number | null;
  totalPrice: number | null;
  status: OrderStatus;
};
