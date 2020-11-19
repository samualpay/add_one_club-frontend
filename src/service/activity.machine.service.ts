import { MachineApiDto } from '../DTO/api/machine'
import { PublishDto } from '../DTO/component/publish'
class ActivityMachineService {
    async bind(activityId: string, machineIds: string[]) {
        //todo: activityMachine bind api
    }
    async findByMachine(malchineId: string): Promise<PublishDto[]> {
        return []
    }
    async findByActivity(activityId: string): Promise<PublishDto[]> {
        return []
    }
}
export default new ActivityMachineService()