import { Request, Response } from "express";
import { ProjectDTO } from "src/dto/project.dto";
import { UserIdsDTO } from "src/dto/user-ids.dto";
import { ProjectService } from "src/service/project.service";

export class ProjectController {
  private projectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }

  createProject = async (req: Request, res: Response) => {
    const data: ProjectDTO = req.body;
    const newProject = await this.projectService.createProject(data);
    return res.status(200).json(newProject);
  };

  addUsersToProject = async (req: Request, res: Response) => {
    const projectId: string = req.params.id;
    const reqBody: UserIdsDTO = req.body;
    const updatedProject = await this.projectService.addUsersToProject(
      projectId,
      reqBody.userIds
    );
    return res.status(200).json(updatedProject);
  };

  deleteProject = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const deletedProject = await this.projectService.deleteProject(id);
    return res.status(200).json(deletedProject);
  };

  getProjects = async (_: Request, res: Response) => {
    const projects = await this.projectService.getProjects();
    return res.status(200).json(projects);
  };

  getProjectById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const project = await this.projectService.getProjectById(id);
    return res.status(200).json(project);
  };
}
