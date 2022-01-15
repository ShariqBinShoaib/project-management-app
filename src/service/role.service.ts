import { RoleDTO } from "../dto/role.dto";
import { RoleRepository } from "../repository/role.repository";

export class RoleService {
  private roleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async createRole(role: RoleDTO) {
    const newRole = await this.roleRepository.createRole(role);
    return newRole;
  }

  async deleteRole(id: string) {
    return await this.roleRepository.delete(id);
  }

  getRoles = async () => {
    return await this.roleRepository.find();
  };

  async getRoleById(id: string) {
    return this.roleRepository.findOne(id);
  }
}
