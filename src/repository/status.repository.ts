import { Repository } from "typeorm";
import { Status } from "../entity/Status";
import { StatusDTO } from "../dto/status.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { FindOptions, FormattedResponse, Order } from "../types";
import { dataSource } from "../startup/db";
import { formatFindAndCountResponse } from "../utils/functions";

export type StatusRepository = Repository<Status> & {
  createStatus(status: StatusDTO): Promise<Status>;
  getStatuses(
    limit?: number,
    offset?: number,
    orderBy?: keyof Status,
    order?: Order
  ): Promise<FormattedResponse<Status>>;
};

export const statusRepository: StatusRepository = dataSource.getRepository(Status).extend({
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
  },

  async getStatuses(limit?: number, offset?: number, orderBy?: keyof Status, order?: Order) {
    const findOptions: FindOptions<Status> = {
      skip: offset,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    };

    if (order !== undefined && orderBy !== undefined) {
      findOptions.order = {
        [orderBy]: order,
      };
    }

    const data = await this.findAndCount(findOptions);

    return formatFindAndCountResponse<Status>(data);
  },
});
