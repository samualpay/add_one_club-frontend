import { PublishDto, transfer as publishTransfer } from "./publish";
import { CustomerDto } from "../customerDto";
import { OrderApiDto } from "../api/order";
import { OrderStatus } from "../../enum/OrderStatus";

export type OrderDto = {
  id: number;
  publish: PublishDto;
  customer: CustomerDto;
  preCount: number | null;
  buyCount: number | null;
  totalPrice: number | null;
  status: OrderStatus;
};

export function transfer(order: OrderApiDto): OrderDto {
  let publish = publishTransfer(order.publish);
  return { ...order, publish };
}
