import express, { Application, Router } from "express";
import { error } from "../middleware/error";

import { registerRoleModule } from "../module/role.module";
import { registerUserModule } from "../module/user.module";
import { registerProjectModule } from "../module/project.module";

export function inititalizeRoutes(app: Application) {
  const role: Router = registerRoleModule();
  const user: Router = registerUserModule();
  const project: Router = registerProjectModule();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/roles", role);
  app.use("/api/users", user);
  app.use("/api/projects", project);
  app.use(error);
}
