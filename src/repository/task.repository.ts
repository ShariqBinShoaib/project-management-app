import { EntityRepository } from "typeorm";
import { Task } from "../entity/Task";
import { TaskDTO } from "../dto/task.dto";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(Task)
export class TaskRepository extends BaseRepository<Task> {
  async createTask(task: TaskDTO) {
    const newTask = new Task(task);
    await newTask.save();
    return newTask;
  }
}
