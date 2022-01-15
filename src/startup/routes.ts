import express, { Application } from "express";
import { error } from "../middleware/error";

import { registerRoleModule } from "../module/role.module";

export function inititalizeRoutes(app: Application) {
  const role = registerRoleModule();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/roles", role);
  app.use(error);
}
