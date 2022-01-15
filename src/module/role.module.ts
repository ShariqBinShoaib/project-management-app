import express from "express";
import { getCustomRepository } from "typeorm";
import { RoleRepository } from "../repository/role.repository";
import { RoleService } from "../service/role.service";
import { RoleController } from "../controller/role.controller";
import { RoleDTO } from "../dto/role.dto";
import { validateReqBody } from "../middleware/validation";
import asyncMiddleware from "../middleware/async";

export function registerRoleModule() {
  const router = express.Router();

  const roleRepository = getCustomRepository(RoleRepository);
  const roleService = new RoleService(roleRepository);
  const roleController = new RoleController(roleService);

  router.get("/", asyncMiddleware(roleController.getRoles));
  router.get("/:id", asyncMiddleware(roleController.getRoleById));
  router.post(
    "/",
    validateReqBody(RoleDTO),
    asyncMiddleware(roleController.createRole)
  );
  router.delete("/:id", asyncMiddleware(roleController.deleteRole));

  return router;
}
