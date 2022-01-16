import { EntityRepository, Repository } from "typeorm";
import { Role } from "../entity/Role";
import { RoleDTO } from "../dto/role.dto";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async createRole(role: RoleDTO) {
    const newRole = new Role(role);
    await newRole.save();
    const savedRole = await this.findOne(newRole.id);
    return savedRole;
  }

  async deleteRole(id: string) {
    await this.delete(id);
  }
}
