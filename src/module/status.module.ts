import express from "express";
import { getCustomRepository } from "typeorm";
import { StatusRepository } from "../repository/status.repository";
import { StatusService } from "../service/status.service";
import { StatusController } from "../controller/status.controller";
import { StatusDTO } from "../dto/status.dto";
import { validateReqBody } from "../middleware/validation";
import asyncMiddleware from "../middleware/async";

export function registerStatusModule() {
  const router = express.Router();

  const statusRepository = getCustomRepository(StatusRepository);
  const statusService = new StatusService(statusRepository);
  const statusController = new StatusController(statusService);

  router.get("/", asyncMiddleware(statusController.getStatuses));
  router.get("/:id", asyncMiddleware(statusController.getStatusById));
  router.post(
    "/",
    validateReqBody(StatusDTO),
    asyncMiddleware(statusController.createStatus)
  );
  router.delete("/:id", asyncMiddleware(statusController.deleteStatus));

  return router;
}
