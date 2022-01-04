import { Role } from "src/entity/Role";
import { Repository } from "typeorm";
import { RoleDTO } from "src/dto/role.dto";

export class RoleRepository extends Repository<Role> {
  async createRole(role: RoleDTO) {
    const newRole = new Role(role);
    await newRole.save();
  }
}
