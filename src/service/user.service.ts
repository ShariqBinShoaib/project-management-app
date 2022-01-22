import { UserDTO } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";

export class UserService {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: UserDTO) {
    const newUser = await this.userRepository.createUser(user);
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
}
