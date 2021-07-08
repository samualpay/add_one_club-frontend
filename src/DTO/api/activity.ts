import { ActivityDto } from "../component/activity";
export type ImageApiDto = {
  fileName: string;
  order: number;
};
export type DiscountApiDto = {
  id?: number;
  peopleCount: number;
  percent: number;
};
export type ActivityApiDto = {
  id: number;
  code: string;
  name: string;
  description: string;
  start_at: number;
  end_at: number;
  pay_end_at: number;
  price: number;
  total_count?: number;
  images: ImageApiDto[];
  videos: ImageApiDto[];
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
    let pay_end_at = Math.round(data.payEndAt.valueOf() / 1000);
    let images: ImageApiDto[] = [];
    let videos: ImageApiDto[] = [];
    if (data.images) {
      images = data.images.map((elem, index) => {
        return { fileName: elem, order: index };
      });
    }
    if (data.videos) {
      videos = data.videos.map((elem, index) => {
        return { fileName: elem, order: index };
      });
    }
    return {
      id: data.id,
      code: data.code,
      images: images,
      videos: videos,
      name: data.name,
      description: data.description,
      start_at: Math.round(start.valueOf() / 1000),
      end_at: Math.round(end.valueOf() / 1000),
      pay_end_at,
      price: data.price,
      total_count: data.totalCount,
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
