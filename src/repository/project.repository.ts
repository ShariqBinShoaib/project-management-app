import { Repository } from "typeorm";
import { Project } from "../entity/Project";
import { ProjectDTO } from "../dto/project.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../entity/User";
import { NotFoundError } from "../errors/NotFoundError";
import { FindOptions, FormattedResponse, Order } from "../types";
import { dataSource } from "../startup/db";
import { formatFindAndCountResponse } from "../utils/functions";

export type ProjectRepository = Repository<Project> & {
  createProject(role: ProjectDTO): Promise<Project>;
  addUsersToProject(projectId: number, users: User[]): Promise<Project>;
  getProjects(
    limit?: number,
    offset?: number,
    orderBy?: keyof Project,
    order?: Order
  ): Promise<FormattedResponse<Project>>;
};

export const projectRepository: ProjectRepository = dataSource.getRepository(Project).extend({
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
  },

  async addUsersToProject(projectId: number, users: User[]) {
    const project = await this.findOneBy({ id: projectId });
    if (project) {
      project.users = users;
      await project.save();
      return project;
    } else {
      throw new NotFoundError({
        detail: `Project with id "${projectId}" not found`,
      });
    }
  },

  async getProjects(limit?: number, offset?: number, orderBy?: keyof Project, order?: Order) {
    const findOptions: FindOptions<Project> = {
      skip: offset,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    };

    if (order !== undefined && orderBy !== undefined) {
      findOptions.order = {
        [orderBy]: order,
      };
    }

    const data = await this.findAndCount(findOptions);

    return formatFindAndCountResponse<Project>(data);
  },
});
