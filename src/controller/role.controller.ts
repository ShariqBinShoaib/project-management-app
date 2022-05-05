import { Request, Response } from "express";
import { RoleDTO } from "src/dto/role.dto";
import { RoleService } from "src/service/role.service";

export class RoleController {
  private roleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  createRole = async (req: Request, res: Response) => {
    const data: RoleDTO = req.body as RoleDTO;
    const newRole = await this.roleService.createRole(data);
    return res.status(200).json(newRole);
  };

  deleteRole = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const deletedRole = await this.roleService.deleteRole(id);
    return res.status(200).json(deletedRole);
  };

  getRoles = async (_: Request, res: Response) => {
    const roles = await this.roleService.getRoles();
    return res.status(200).json(roles);
  };

  getRoleById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const role = await this.roleService.getRoleById(id);
    return res.status(200).json(role);
  };
}
