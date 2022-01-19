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

  deleteRole(id: string) {
    return this.roleRepository.delete(id);
  }

  getRoles() {
    return this.roleRepository.getAll();
  }

  getRoleById(id: string) {
    return this.roleRepository.findOne(id);
  }

  getRoleByName(name: string) {
    return this.roleRepository.findOne({ name });
  }
}
