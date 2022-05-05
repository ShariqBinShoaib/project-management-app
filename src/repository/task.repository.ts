import { Repository } from "typeorm";
import { Task } from "../entity/Task";
import { TaskDTO } from "../dto/task.dto";
import { FindOptions, FormattedResponse, Order } from "../types";
import { dataSource } from "../startup/db";
import { formatFindAndCountResponse } from "../utils/functions";

export type TaskRepository = Repository<Task> & {
  createTask(role: TaskDTO): Promise<Task>;
  getTasks(
    limit?: number,
    offset?: number,
    orderBy?: keyof Task,
    order?: Order
  ): Promise<FormattedResponse<Task>>;
};

export const taskRepository: TaskRepository = dataSource.getRepository(Task).extend({
  async createTask(task: TaskDTO) {
    const newTask = new Task(task);
    await newTask.save();
    return newTask;
  },

  async getTasks(limit?: number, offset?: number, orderBy?: keyof Task, order?: Order) {
    const findOptions: FindOptions<Task> = {
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

    return formatFindAndCountResponse<Task>(data);
  },
});
