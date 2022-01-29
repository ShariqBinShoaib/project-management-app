import { genSalt, hash } from "bcrypt";
import { UserDTO } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: UserDTO) {
    const clonedUser: UserDTO = { ...user };
    const salt = await genSalt();
    clonedUser.password = await this.hashPassword(user.password, salt);

    const newUser = await this.userRepository.createUser(clonedUser);
    return newUser;
  }

  updateUser(id: string, user: UserDTO) {
    return this.userRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.userRepository.delete(id);
  }

  getUsers() {
    return this.userRepository.getAll();
  }

  getUserById(id: string) {
    return this.userRepository.findOne(id, { relations: ["role"] });
  }

  getUserByName(name: string) {
    return this.userRepository.findOne({ name });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}
