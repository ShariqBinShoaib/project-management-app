import { Request, Response } from "express";
import { RoleDTO } from "src/dto/role.dto";
import { RoleService } from "src/service/role.service";

export class RoleController {
  private roleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  async createRole(req: Request, res: Response) {
    const data: RoleDTO = <RoleDTO>req.body;
    const newRole = await this.roleService.createRole(data);
    return res.status(200).json(newRole);
  }

  async deleteRole(req: Request, res: Response) {
    const id: string = req.params.id;
    const deletedRole = await this.roleService.deleteRole(id);
    return res.status(200).json(deletedRole);
  }
}
