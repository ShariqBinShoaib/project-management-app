import express, { Application } from "express";
import { registerUserModule } from "../module/user.module";
import { error } from "../middleware/error";

import { registerRoleModule } from "../module/role.module";

export function inititalizeRoutes(app: Application) {
  const role = registerRoleModule();
  const user = registerUserModule();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/roles", role);
  app.use("/api/users", user);
  app.use(error);
}
