import { In, Repository } from "typeorm";
import { dataSource } from "../startup/db";
import { Role } from "../entity/Role";
import { RoleDTO } from "../dto/role.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { FormattedResponse, FindOptions, Order } from "../types";
import { formatFindAndCountResponse } from "../utils/functions";

export type RoleRepository = Repository<Role> & {
  createRole(role: RoleDTO): Promise<Role>;
  getRoleIdsByNames(names: string[]): Promise<number[]>;
  getRoles(
    limit?: number,
    offset?: number,
    orderBy?: keyof Role,
    order?: Order
  ): Promise<FormattedResponse<Role>>;
};

export const roleRepository: RoleRepository = dataSource.getRepository(Role).extend({
  async createRole(role: RoleDTO) {
    const newRole = new Role(role);

    try {
      await newRole.save();
      return newRole;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestError({
          name: "Role with this name already exist",
        });
      } else {
        throw error;
      }
    }
  },

  async getRoleIdsByNames(names: string[]) {
    const roles = await this.findBy({ name: In(names) });
    return roles.map((role) => role.id);
  },

  async getRoles(limit?: number, offset?: number, orderBy?: keyof Role, order?: Order) {
    const findOptions: FindOptions<Role> = {
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

    return formatFindAndCountResponse<Role>(data);
  },
});
