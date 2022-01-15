import { Role } from "../entity/Role";
import { EntityRepository, Repository } from "typeorm";
import { RoleDTO } from "../dto/role.dto";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async createRole(role: RoleDTO) {
    const newRole = new Role(role);
    await newRole.save();
    return newRole;
  }

  async deleteRole(id: string) {
    await this.delete(id);
  }
}
