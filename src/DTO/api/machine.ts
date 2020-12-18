import { MachineDto } from "../component/machine";

export type MachineApiDto = {
  id: number;
  code: string;
  city: string;
  dist: string;
  address: string;
  area: string;
  storeAttribute: string;
  machineType: string;
};
export function transfer(dto: MachineDto): MachineApiDto {
  let { city, dist } = dto.location;
  return { ...dto, city, dist };
}
