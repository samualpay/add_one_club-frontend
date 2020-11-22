import { ActivityDto } from "../component/activity";

export type DiscountApiDto = {
  peopleCount: number;
  percent: number;
};
export type ActivityApiDto = {
  id: string;
  imgUrl: string;
  videoUrl: string;
  description: string;
  start_at: number;
  end_at: number;
  price: number;
  discounts: DiscountApiDto[];
  finalPrice: number | null;
  status?: "not_started" | "start" | "end";
};

export function transfer(data: ActivityDto): ActivityApiDto {
  if (data.timeRange && data.timeRange.length === 2 && data.price) {
    return {
      id: data.id,
      imgUrl: data.imgUrl,
      videoUrl: data.videoUrl,
      description: data.description,
      start_at: data.timeRange[0].valueOf(),
      end_at: data.timeRange[1].valueOf(),
      price: data.price,
      discounts: data.discounts,
      finalPrice: data.finalPrice,
      status: data.status,
    };
  } else {
    throw new Error("data2APIData failed");
  }
}
