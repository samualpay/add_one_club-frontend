import { PublishApiDto } from "../api/publish";
import { ActivityDto, transfer as activityTransfer } from "./activity";
import { MachineDto } from "./machine";

export type PublishDto = {
    id: number;
    activity: ActivityDto;
    machine: MachineDto;
    linkCount: number;
    registeredCount: number;
    url: string;
}

export function transfer(data: PublishApiDto): PublishDto {
    return {
        id: data.id,
        activity: activityTransfer(data.activity),
        machine: data.machine,
        linkCount: data.linkCount,
        registeredCount: data.registeredCount,
        url: data.url
    }
}