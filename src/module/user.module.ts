import express from "express";
import { userRepository } from "../repository/user.repository";
import { UserService } from "../service/user.service";
import { UserController } from "../controller/user.controller";
import { UserDTO } from "../dto/user.dto";
import { validateReqBody } from "../middleware/validation";
import asyncMiddleware from "../middleware/async";

export function registerUserModule() {
  const router = express.Router();

  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  router.get("/", asyncMiddleware(userController.getUsers));
  router.get("/:id", asyncMiddleware(userController.getUserById));
  router.delete("/:id", asyncMiddleware(userController.deleteUser));
  router.post("/", validateReqBody(UserDTO), asyncMiddleware(userController.createUser));
  router.put("/:id", validateReqBody(UserDTO), asyncMiddleware(userController.updateUser));

  return router;
}
