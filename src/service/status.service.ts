import { Status } from "../entity/Status";
import { StatusDTO } from "../dto/status.dto";
import { StatusRepository } from "../repository/status.repository";

export class StatusService {
  private statusRepository;

  constructor(statusRepository: StatusRepository) {
    this.statusRepository = statusRepository;
  }

  async createStatus(status: StatusDTO) {
    let defaultStatus: Status | undefined;
    if (status.isDefault) {
      defaultStatus = await this.statusRepository.findOne({ isDefault: true });
    }
    const newStatus = await this.statusRepository.createStatus(status);

    if (defaultStatus) {
      defaultStatus.isDefault = false;
      await defaultStatus.save();
    }
    return newStatus;
  }

  deleteStatus(id: string) {
    return this.statusRepository.delete(id);
  }

  getStatuses() {
    return this.statusRepository.getAll();
  }

  getStatusById(id: string) {
    return this.statusRepository.findOne(id);
  }
}
