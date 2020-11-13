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
    start_at: Date | null;
    end_at: Date | null;
    price: number | null;
    discounts: Discount[]
}
export default Data