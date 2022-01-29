import express from "express";
import { getCustomRepository } from "typeorm";
import { ProjectRepository } from "../repository/project.repository";
import { UserRepository } from "../repository/user.repository";
import { ProjectService } from "../service/project.service";
import { ProjectController } from "../controller/project.controller";
import { ProjectDTO } from "../dto/project.dto";
import { validateReqBody } from "../middleware/validation";
import asyncMiddleware from "../middleware/async";
import { UserIdsDTO } from "../dto/user-ids.dto";

export function registerProjectModule() {
  const router = express.Router();

  const projectRepository = getCustomRepository(ProjectRepository);
  const userRepository = getCustomRepository(UserRepository);
  const projectService = new ProjectService(projectRepository, userRepository);
  const projectController = new ProjectController(projectService);

  router.post(
    "/",
    validateReqBody(ProjectDTO),
    asyncMiddleware(projectController.createProject)
  );
  router.get("/", asyncMiddleware(projectController.getProjects));
  router.get("/:id", asyncMiddleware(projectController.getProjectById));
  router.delete("/:id", asyncMiddleware(projectController.deleteProject));
  router.patch(
    "/:id/add-users",
    validateReqBody(UserIdsDTO),
    asyncMiddleware(projectController.addUsersToProject)
  );

  return router;
}
