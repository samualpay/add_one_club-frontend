import { PublishApiDto } from "../api/publish";
import { ActivityDto, transfer as activityTransfer } from "./activity";
import { MachineDto, transfer as machineTransfer } from "./machine";

export type PublishDto = {
  id: number;
  activity: ActivityDto;
  machine: MachineDto;
  linkCount: number;
  registeredCount: number;
  buyCount: number;
  url: string;
  publish: boolean;
};

export function transfer(data: PublishApiDto): PublishDto {
  return {
    id: data.id,
    activity: activityTransfer(data.activity),
    machine: machineTransfer(data.machine),
    linkCount: data.linkCount,
    registeredCount: data.registeredCount,
    buyCount: data.buyCount,
    url: data.url,
    publish: data.publish,
  };
}
