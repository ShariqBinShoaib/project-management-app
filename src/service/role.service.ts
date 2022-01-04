import { RoleDTO } from "src/dto/role.dto";
import { RoleRepository } from "src/repository/role.repository";

export default class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  createRole(role: RoleDTO) {
    this.roleRepository.createRole(role);
  }

  deleteRole(id: number) {
    this.roleRepository.delete(id);
  }
}
