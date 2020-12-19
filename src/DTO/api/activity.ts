import { ActivityDto } from "../component/activity";

export type DiscountApiDto = {
  peopleCount: number;
  percent: number;
};
export type ActivityApiDto = {
  id: number;
  code: string;
  imgUrl: string;
  videoUrl: string;
  description: string;
  start_at: number;
  end_at: number;
  price: number;
  discounts: DiscountApiDto[];
  finalPrice: number | null;
  status?: "not_started" | "start" | "end";
  linkCount?: number;
  registeredCount?: number;
  buyCount?: number;
};

export function transfer(data: ActivityDto): ActivityApiDto {
  if (data.timeRange && data.timeRange.length === 2 && data.price) {
    let start = data.timeRange[0];
    let end = data.timeRange[1];
    start.set({ second: 0 });
    end.set({ second: 0 });
    return {
      id: data.id,
      code: data.code,
      imgUrl: data.imgUrl,
      videoUrl: data.videoUrl,
      description: data.description,
      start_at: Math.round(start.valueOf() / 1000),
      end_at: Math.round(end.valueOf() / 1000),
      price: data.price,
      discounts: data.discounts,
      finalPrice: data.finalPrice,
      status: data.status,
      linkCount: data.linkCount,
      registeredCount: data.registeredCount,
      buyCount: data.buyCount,
    };
  } else {
    throw new Error("data2APIData failed");
  }
}
