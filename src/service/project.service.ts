import { UserRepository } from "src/repository/user.repository";
import { ProjectDTO } from "../dto/project.dto";
import { ProjectRepository } from "../repository/project.repository";

export class ProjectService {
  private projectRepository;
  private userRepository;

  constructor(
    projectRepository: ProjectRepository,
    userRepository: UserRepository
  ) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
  }

  async createProject(project: ProjectDTO) {
    const users = await this.userRepository.getUsersByIds(project.userIds);
    project.users = users;

    const newProject = await this.projectRepository.createProject(project);
    return newProject;
  }

  async addUsersToProject(projectId: string, userIds: number[]) {
    const users = await this.userRepository.getUsersByIds(userIds);
    return this.projectRepository.addUsersToProject(projectId, users);
  }

  deleteProject(id: string) {
    return this.projectRepository.delete(id);
  }

  getProjects() {
    return this.projectRepository.getAll();
  }

  getProjectById(id: string) {
    return this.projectRepository.findOne(id, { relations: ["users"] });
  }

  getProjectByName(name: string) {
    return this.projectRepository.findOne({ name });
  }
}
