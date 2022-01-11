import { RoleDTO } from "src/dto/role.dto";
import { RoleRepository } from "src/repository/role.repository";

export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async createRole(role: RoleDTO) {
    const newRole = await this.roleRepository.createRole(role);
    return newRole;
  }

  async deleteRole(id: string) {
    this.roleRepository.delete(id);
  }
}
