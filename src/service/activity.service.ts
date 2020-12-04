import Axios from "axios";
import moment from "moment";
import { ActivityApiDto, transfer as data2APIData } from "../DTO/api/activity";
import {
  ActivityDto,
  transfer as apiData2Data,
} from "../DTO/component/activity";

const fakeData: ActivityApiDto[] = [];
class ActivityService {
  async findAll(): Promise<ActivityDto[]> {
    let response = await Axios.get<{ list: ActivityApiDto[] }>(
      "/api/activitys"
    );
    let list = response.data.list;
    return list.map((elem) => apiData2Data(elem));
  }
  async create(data: ActivityDto) {
    const item = data2APIData(data);
    await Axios.post("/api/activitys", item);
  }
  async update(data: ActivityDto) {
    const item = data2APIData(data);
    await Axios.put("/api/activitys", item);
    // const index = fakeData.findIndex((item) => item.id === data.id);
    // if (index >= 0) {
    //   fakeData[index] = data2APIData(data);
    //   return data;
    // } else {
    //   throw new Error("id not found");
    // }
  }
  async delete(id: number) {
    await Axios.delete(`/api/activitys/${id}`);
    // const index = fakeData.findIndex(item => item.id === id)
    // if (index >= 0) {
    //   fakeData.splice(index, 1)
    // } else {
    //   throw new Error('id not found')
    // }
  }
  async end(id: number) {
    // const index = fakeData.findIndex(item => item.id === id)
    // if (index >= 0) {
    //   fakeData[index].status = "end"
    // } else {
    //   throw new Error('id not found')
    // }
  }
}
export default new ActivityService();
