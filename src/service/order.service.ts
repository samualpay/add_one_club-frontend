import OrderDto from "../DTO/component/order";
import moment from "moment";
type FindProps = {
  machineId?: number;
  activityId?: string;
  status?: "preorder" | "paid" | "finish";
};
class OrderService {
  async find({
    machineId,
    activityId,
    status,
  }: FindProps): Promise<OrderDto[]> {
    //todo query Order api
    console.log(machineId, activityId, status);
    return [
      {
        id: 10,
        publish: {
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
            status: "end",
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
        },
        user: {
          id: 1,
          email: "xxx@gmail.com",
          name: "xxx",
          phone: "09xxxxxxxx",
          address: "xxxxx",
        },
        preCount: 10,
        buyCount: 10,
        totalPrice: 1000,
        status: "paid",
      },
      {
        id: 11,
        publish: {
          id: 2,
          activity: {
            id: 2,
            code: "223",
            imgUrl: "223",
            videoUrl: "222",
            description: "223",
            timeRange: [moment(), moment()],
            price: 100,
            discounts: [],
            status: "start",
            finalPrice: null,
          },
          machine: {
            id: 2,
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
        },
        user: {
          id: 2,
          email: "xxx@gmail.com",
          name: "xxx",
          phone: null,
          address: null,
        },
        preCount: 10,
        buyCount: null,
        totalPrice: null,
        status: "preorder",
      },
    ];
  }
}

export default new OrderService();
