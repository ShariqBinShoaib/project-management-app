import { Request, Response } from "express";
import { TaskDTO } from "src/dto/task.dto";
import { TaskService } from "src/service/task.service";

export class TaskController {
  private taskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  createTask = async (req: Request, res: Response) => {
    const data: TaskDTO = req.body as TaskDTO;
    const newTask = await this.taskService.createTask(data);
    return res.status(200).json(newTask);
  };

  deleteTask = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const deletedTask = await this.taskService.deleteTask(id);
    return res.status(200).json(deletedTask);
  };

  getTasks = async (_: Request, res: Response) => {
    const tasks = await this.taskService.getTasks();
    return res.status(200).json(tasks);
  };

  getTaskById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const task = await this.taskService.getTaskById(id);
    return res.status(200).json(task);
  };
}
