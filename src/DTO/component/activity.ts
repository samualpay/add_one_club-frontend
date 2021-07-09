import moment from "moment";
import { Moment } from "moment";
import { ActivityApiDto } from "../api/activity";
export type DiscountDto = {
  peopleCount: number;
  percent: number;
};
export type ActivityDto = {
  id: number;
  code: string;
  images: string[];
  videos: string[];
  name: string;
  description: string;
  timeRange: Moment[] | null;
  payEndAt: Moment;
  price: number | null;
  totalCount?: number;
  discounts: DiscountDto[];
  finalPrice: number | null;
  status?: "not_started" | "start" | "end";
  linkCount?: number;
  registeredCount?: number;
  buyCount?: number;
  publishCount?: number;
  preorderProductItem?: number;
};

export function transfer(data: ActivityApiDto): ActivityDto {
  let images: string[] = [];
  let videos: string[] = [];
  const payEndAt = moment(data.pay_end_at * 1000);
  if (data.images) {
    images = data.images
      .sort((a, b) => a.order - b.order)
      .map((elem) => elem.fileName);
  }
  if (data.videos) {
    videos = data.videos
      .sort((a, b) => a.order - b.order)
      .map((elem) => elem.fileName);
  }
  return {
    id: data.id,
    code: data.code,
    images: images,
    videos: videos,
    name: data.name,
    description: data.description,
    timeRange: [moment(data.start_at * 1000), moment(data.end_at * 1000)],
    payEndAt,
    price: data.price,
    totalCount: data.total_count,
    discounts: data.discounts,
    finalPrice: data.finalPrice,
    status: data.status,
    linkCount: data.linkCount,
    registeredCount: data.registeredCount,
    buyCount: data.buyCount,
    preorderProductItem: data.preorderProductItem,
  };
}
