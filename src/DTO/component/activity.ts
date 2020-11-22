import moment from "moment";
import { Moment } from "moment";
import { ActivityApiDto } from "../api/activity";

export type DiscountDto = {
  peopleCount: number;
  percent: number;
};
export type ActivityDto = {
  id: string;
  imgUrl: string;
  videoUrl: string;
  description: string;
  timeRange: Moment[] | null;
  price: number | null;
  discounts: DiscountDto[];
  finalPrice: number | null;
  status?: "not_started" | "start" | "end";
};

export function transfer(data: ActivityApiDto): ActivityDto {
  return {
    id: data.id,
    imgUrl: data.imgUrl,
    videoUrl: data.videoUrl,
    description: data.description,
    timeRange: [moment(data.start_at), moment(data.end_at)],
    price: data.price,
    discounts: data.discounts,
    finalPrice: data.finalPrice,
    status: data.status,
  };
}
