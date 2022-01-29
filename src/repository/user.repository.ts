import { EntityRepository, In } from "typeorm";
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
      return newUser;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestError({
          email: "User with this email already exist",
        });
      } else {
        throw error;
      }
    }
  }

  async updateUser(id: string, user: UserDTO) {
    try {
      await this.update(id, user);
      const updatedUser = await this.findOne(id);
      return updatedUser;
    } catch (error) {
      if (error.code === "23505") {
        throw new BadRequestError({
          email: "User with this email already exist",
        });
      } else {
        throw error;
      }
    }
  }

  getUsersByIds(ids: number[]) {
    return this.find({
      where: { id: In(ids) },
    });
  }
}
