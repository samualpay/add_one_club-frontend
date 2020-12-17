import { PublishApiDto } from "./publish";
import { CustomerDto } from "../customerDto";

export type OrderApiDto = {
  id: number;
  publish: PublishApiDto;
  customer: CustomerDto;
  preCount: number | null;
  buyCount: number | null;
  totalPrice: number | null;
  status: "preorder" | "paid" | "finish";
};
