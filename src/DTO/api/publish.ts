import { ActivityApiDto } from "./activity";
import { MachineApiDto } from "./machine";

export type PublishApiDto = {
  id: number;
  activity: ActivityApiDto;
  machine: MachineApiDto;
  linkCount: number;
  registeredCount: number;
  buyCount: number;
  url: string;
  publish: boolean;
};
