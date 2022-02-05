import { EntityRepository } from "typeorm";
import { Status } from "../entity/Status";
import { StatusDTO } from "../dto/status.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(Status)
export class StatusRepository extends BaseRepository<Status> {
  async createStatus(status: StatusDTO) {
    const newStatus = new Status(status);

    try {
      await newStatus.save();
      return newStatus;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestError({
          name: "Status with this name already exist",
        });
      } else {
        throw error;
      }
    }
  }
}
