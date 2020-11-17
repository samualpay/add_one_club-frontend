import { Moment } from "moment"

type Discount = {
    level: number;
    peopleCount: number;
    percent: number;
}
type Data = {
    id: string;
    imgUrl: string;
    videoUrl: string;
    description: string;
    timeRange:Moment[] | null;
    price: number | null;
    discounts: Discount[]
}
export default Data