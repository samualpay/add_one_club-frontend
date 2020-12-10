import { PublishDto } from "../DTO/component/publish";
import moment from "moment";
class ActivityMachineService {
  async bind(activityId: number, machineId: number) {
    //todo: activityMachine bind api
  }
  async findByMachine(malchineId: number): Promise<PublishDto[]> {
    return [
      {
        id: 1,
        activity: {
          id: 1,
          code: "123",
          imgUrl: "123",
          videoUrl: "",
          description: "123",
          timeRange: [moment(), moment()],
          price: 100,
          discounts: [],
          status: "start",
          finalPrice: null,
        },
        machine: {
          id: 1,
          code: "111",
          city: "Zhejiang",
          dist: "Zhejiang",
          address: "111",
          area: "百貨公司",
          machineType: "戶外大型廣告面板",
          storeAttribute: "都會型商圈",
        },
        linkCount: 10,
        registeredCount: 5,
        url: "http://xxx.html",
        publish: true,
      },
    ];
  }
  async findByActivity(activityId: number): Promise<PublishDto[]> {
    return [
      {
        id: 2,
        activity: {
          id: 2,
          code: "222",
          imgUrl: "222",
          videoUrl: "222",
          description: "222",
          timeRange: [moment(), moment()],
          price: 90,
          discounts: [],
          status: "end",
          finalPrice: 90,
        },
        machine: {
          id: 2,
          code: "222",
          city: "222",
          dist: "222",
          address: "222",
          area: "百貨公司",
          machineType: "戶外大型廣告面板",
          storeAttribute: "都會型商圈",
        },
        linkCount: 20,
        registeredCount: 10,
        url: "http://yyy.html",
        publish: false,
      },
      {
        id: 3,
        activity: {
          id: 2,
          code: "222",
          imgUrl: "222",
          videoUrl: "222",
          description: "222",
          timeRange: [moment(), moment()],
          price: 90,
          discounts: [],
          status: "end",
          finalPrice: 90,
        },
        machine: {
          id: 2,
          code: "222",
          city: "222",
          dist: "222",
          address: "222",
          area: "百貨公司",
          machineType: "戶外大型廣告面板",
          storeAttribute: "都會型商圈",
        },
        linkCount: 20,
        registeredCount: 10,
        url: "http://yyy.html",
        publish: false,
      },
    ];
  }
  async delete(id: number) {}
  async publish(id: number, publish: boolean) {}
}
export default new ActivityMachineService();
