import { EntityRepository } from "typeorm";
import { User } from "../entity/User";
import { UserDTO } from "../dto/user.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { BaseRepository } from "./BaseRepository";

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  async createUser(user: UserDTO) {
    const newUser = new User(user);

    try {
      await newUser.save();
      const savedUser = await this.findOne(newUser.id);
      return savedUser;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestError({
          name: "User with this name already exist",
        });
      } else {
        throw error;
      }
    }
  }
}
