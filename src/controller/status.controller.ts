import { Request, Response } from "express";
import { StatusDTO } from "src/dto/status.dto";
import { StatusService } from "src/service/status.service";

export class StatusController {
  private statusService;

  constructor(statusService: StatusService) {
    this.statusService = statusService;
  }

  createStatus = async (req: Request, res: Response) => {
    const data: StatusDTO = req.body as StatusDTO;
    const newStatus = await this.statusService.createStatus(data);
    return res.status(200).json(newStatus);
  };

  deleteStatus = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const deletedStatus = await this.statusService.deleteStatus(id);
    return res.status(200).json(deletedStatus);
  };

  getStatuses = async (_: Request, res: Response) => {
    const statuses = await this.statusService.getStatuses();
    return res.status(200).json(statuses);
  };

  getStatusById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const status = await this.statusService.getStatusById(id);
    return res.status(200).json(status);
  };
}
