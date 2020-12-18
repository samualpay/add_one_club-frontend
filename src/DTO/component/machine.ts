import { MachineApiDto } from "../api/machine";

type Location = {
  city: string;
  dist: string;
};
export type MachineDto = {
  id: number;
  code: string;
  location: Location;
  address: string;
  area: string;
  storeAttribute: string;
  machineType: string;
};

export function transfer(apiDto: MachineApiDto): MachineDto {
  let location = { city: apiDto.city, dist: apiDto.dist };
  return {
    ...apiDto,
    location,
  };
}
