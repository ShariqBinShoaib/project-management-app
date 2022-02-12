import { TaskDTO } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";
import { RoleRepository } from "../repository/role.repository";
import { UserRepository } from "../repository/user.repository";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { StatusRepository } from "src/repository/status.repository";

export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private roleRepository: RoleRepository,
    private userRepository: UserRepository,
    private statusRepository: StatusRepository
  ) {}

  async createTask(task: TaskDTO) {
    const roleIds = await this.roleRepository.getRoleIdsByNames([
      "admin",
      "reporter",
    ]);
    const user = await this.userRepository.findOne(task.reporterId);
    if (!user) throw new NotFoundError({ detail: "User not found!" });
    if (!roleIds.includes(user.id)) {
      throw new BadRequestError({
        reporterId: "Only admin and reporter can assign task",
      });
    }
    if (!task.statusId) {
      const defaultStatus = await this.statusRepository.findOne({
        isDefault: true,
      });
      if (defaultStatus) task.statusId = defaultStatus?.id;
    }
    const newTask = await this.taskRepository.createTask(task);
    return newTask;
  }

  deleteTask(id: string) {
    return this.taskRepository.delete(id);
  }

  getTasks() {
    return this.taskRepository.getAll();
  }

  getTaskById(id: string) {
    return this.taskRepository.findOne(id);
  }
}
