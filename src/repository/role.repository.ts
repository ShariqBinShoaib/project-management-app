import { EntityRepository } from "typeorm";
import { Role } from "../entity/Role";
import { RoleDTO } from "../dto/role.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(Role)
export class RoleRepository extends BaseRepository<Role> {
  async createRole(role: RoleDTO) {
    const newRole = new Role(role);

    try {
      await newRole.save();
      const savedRole = await this.findOne(newRole.id);
      return savedRole;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestError({
          name: "Role with this name already exist",
        });
      } else {
        throw error;
      }
    }
  }
}
