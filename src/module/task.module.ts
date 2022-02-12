import express from "express";
import { getCustomRepository } from "typeorm";
import { TaskRepository } from "../repository/task.repository";
import { RoleRepository } from "../repository/role.repository";
import { UserRepository } from "../repository/user.repository";
import { StatusRepository } from "../repository/status.repository";
import { TaskService } from "../service/task.service";
import { TaskController } from "../controller/task.controller";
import { TaskDTO } from "../dto/task.dto";
import { validateReqBody } from "../middleware/validation";
import asyncMiddleware from "../middleware/async";

export function registerTaskModule() {
  const router = express.Router();

  const taskRepository = getCustomRepository(TaskRepository);
  const roleRepository = getCustomRepository(RoleRepository);
  const userRepository = getCustomRepository(UserRepository);
  const statusRepository = getCustomRepository(StatusRepository);
  const taskService = new TaskService(
    taskRepository,
    roleRepository,
    userRepository,
    statusRepository
  );
  const taskController = new TaskController(taskService);

  router.get("/", asyncMiddleware(taskController.getTasks));
  router.get("/:id", asyncMiddleware(taskController.getTaskById));
  router.post(
    "/",
    validateReqBody(TaskDTO),
    asyncMiddleware(taskController.createTask)
  );
  router.delete("/:id", asyncMiddleware(taskController.deleteTask));

  return router;
}
