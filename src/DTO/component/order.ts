import { PublishDto } from "./publish";
import UserDto from "../user";

type OrderDto = {
  id: number;
  publish: PublishDto;
  user: UserDto;
  preCount: number | null;
  buyCount: number | null;
  totalPrice: number | null;
  status: "preorder" | "paid" | "finish";
};
export default OrderDto;
