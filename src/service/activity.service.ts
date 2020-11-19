import moment from "moment";
import { ActivityApiDto, transfer as data2APIData } from '../DTO/api/activity'
import { ActivityDto, transfer as apiData2Data } from '../DTO/component/activity'

const fakeData: ActivityApiDto[] = [];
class ActivityService {
  async findAll(): Promise<ActivityDto[]> {
    return fakeData.map<ActivityDto>((data) => {
      return apiData2Data(data)
    });
  }
  async create(data: ActivityDto) {
    if (!fakeData.some((item) => item.id === data.id)) {
      const item = data2APIData(data)
      item.status = "start"
      fakeData.push(item)
      return data
    } else {
      throw new Error('id 重複')
    }
  }
  async update(data: ActivityDto) {
    const index = fakeData.findIndex(item => item.id === data.id)
    if (index >= 0) {
      fakeData[index] = data2APIData(data)
      return data
    } else {
      throw new Error('id not found')
    }
  }
  async delete(id: string) {
    const index = fakeData.findIndex(item => item.id === id)
    if (index >= 0) {
      fakeData.splice(index, 1)
    } else {
      throw new Error('id not found')
    }
  }
  async end(id: string) {
    const index = fakeData.findIndex(item => item.id === id)
    if (index >= 0) {
      fakeData[index].status = "end"
    } else {
      throw new Error('id not found')
    }
  }
}
export default new ActivityService();
