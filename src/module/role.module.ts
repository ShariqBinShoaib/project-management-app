import express from "express";
import { RoleRepository } from "src/repository/role.repository";
import { RoleService } from "src/service/role.service";
import { RoleController } from "src/controller/role.controller";
import asyncMiddleware from "src/middleware/async";

const router = express.Router();

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

router.get("/", asyncMiddleware(roleController.createRole));
router.delete("/", asyncMiddleware(roleController.deleteRole));

export default router;
