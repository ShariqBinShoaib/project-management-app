import { Status } from "../entity/Status";
import { StatusDTO } from "../dto/status.dto";
import { StatusRepository } from "../repository/status.repository";

export class StatusService {
  private statusRepository;

  constructor(statusRepository: StatusRepository) {
    this.statusRepository = statusRepository;
  }

  async createStatus(status: StatusDTO) {
    let defaultStatus: Status | null | undefined;

    if (status.isDefault) {
      defaultStatus = await this.statusRepository.findOneBy({ isDefault: true });
    }
    const newStatus = await this.statusRepository.createStatus(status);

    if (defaultStatus) {
      defaultStatus.isDefault = false;
      await defaultStatus.save();
    }
    return newStatus;
  }

  deleteStatus(id: number) {
    return this.statusRepository.delete(id);
  }

  getStatuses() {
    return this.statusRepository.getStatuses();
  }

  getStatusById(id: number) {
    return this.statusRepository.findOneBy({ id });
  }
}
