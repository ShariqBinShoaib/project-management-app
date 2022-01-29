import { EntityRepository } from "typeorm";
import { Project } from "../entity/Project";
import { ProjectDTO } from "../dto/project.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { BaseRepository } from "./BaseRepository";
import { User } from "../entity/User";
import { NotFoundError } from "../errors/NotFoundError";

@EntityRepository(Project)
export class ProjectRepository extends BaseRepository<Project> {
  async createProject(project: ProjectDTO) {
    const newProject = new Project(project);

    try {
      await newProject.save();
      return newProject;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestError({
          key: "Project with this key already exist",
        });
      } else {
        throw error;
      }
    }
  }

  async addUsersToProject(projectId: string, users: User[]) {
    const project = await this.findOne(projectId);
    if (project) {
      project.users = users;
      await project.save();
      return project;
    } else {
      throw new NotFoundError({
        detail: `Project with id "${projectId}" not found`,
      });
    }
  }
}
