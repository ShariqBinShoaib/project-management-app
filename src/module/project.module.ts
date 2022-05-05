import express from "express";
import { projectRepository } from "../repository/project.repository";
import { userRepository } from "../repository/user.repository";
import { ProjectService } from "../service/project.service";
import { ProjectController } from "../controller/project.controller";
import { ProjectDTO } from "../dto/project.dto";
import { UserIdsDTO } from "../dto/user.dto";
import { validateReqBody } from "../middleware/validation";
import asyncMiddleware from "../middleware/async";

export function registerProjectModule() {
  const router = express.Router();

  const projectService = new ProjectService(projectRepository, userRepository);
  const projectController = new ProjectController(projectService);

  router.post("/", validateReqBody(ProjectDTO), asyncMiddleware(projectController.createProject));
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
