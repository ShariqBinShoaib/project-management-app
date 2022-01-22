import { Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { UserService } from "../service/user.service";

export class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response) => {
    const data: UserDTO = req.body;
    const newUser = await this.userService.createUser(data);
    return res.status(200).json(newUser);
  };

  updateUser = async (req: Request, res: Response) => {
    const data: UserDTO = req.body;
    const id: string = req.params.id;
    const updatedUser = await this.userService.updateUser(id, data);
    return res.status(200).json(updatedUser);
  };

  deleteUser = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const deletedUser = await this.userService.deleteUser(id);
    return res.status(200).json(deletedUser);
  };

  getUsers = async (_: Request, res: Response) => {
    const users = await this.userService.getUsers();
    return res.status(200).json(users);
  };

  getUserById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const user = await this.userService.getUserById(id);
    return res.status(200).json(user);
  };
}
