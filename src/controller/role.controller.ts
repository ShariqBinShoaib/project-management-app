import { Request, Response } from "express";
import RoleService from "src/service/role.service";

export class RoleController {
  private roleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  async createRole(req: Request, res: Response) {
    
  }
}
