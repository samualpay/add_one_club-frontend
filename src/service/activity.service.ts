import Data from "../pages/admin/activitySetting/type/data";
import moment from "moment";

type APIDiscount = {
  level: number;
  peopleCount: number;
  percent: number;
};
type APIData = {
  id: string;
  imgUrl: string;
  videoUrl: string;
  description: string;
  start_at: number;
  end_at: number;
  price: number;
  discounts: APIDiscount[];
};
const fakeData: APIData[] = [];
class ActivityService {
  async findAll(): Promise<Data[]> {
    return fakeData.map<Data>((data) => {
      return this.apiData2Data(data)
    });
  }
  private apiData2Data(data: APIData):Data {
    return {
        id: data.id,
        imgUrl: data.imgUrl,
        videoUrl: data.videoUrl,
        description: data.description,
        timeRange: [moment.unix(data.start_at), moment.unix(data.end_at)],
        price: data.price,
        discounts: data.discounts,
      };
  }
  private data2APIData(data: Data):APIData {
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
      };
    }else{
        throw new Error('data2APIData failed')
    }
  }
  async create(data: Data) {
    if(!fakeData.some((item)=>item.id===data.id)){
        fakeData.push(this.data2APIData(data))
        return data
    }else {
        throw new Error('id 重複')
    }
  }
  async update(data: Data) {
    const index = fakeData.findIndex(item => item.id === data.id)
        if(index >= 0){
            fakeData[index] = this.data2APIData(data)
            return data
        }else{
            throw new Error('id not found')
        }
  }
  async delete(id:string) {
    const index = fakeData.findIndex(item => item.id === id)
        if(index >= 0){
            fakeData.splice(index,1)
        }else{
            throw new Error('id not found')
        }
  }
}
export default new ActivityService();
