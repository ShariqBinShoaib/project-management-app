import { In, Repository } from "typeorm";
import { User } from "../entity/User";
import { UserDTO } from "../dto/user.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { FindOptions, FormattedResponse, Order } from "../types";
import { dataSource } from "../startup/db";
import { formatFindAndCountResponse } from "../utils/functions";

export type UserRepository = Repository<User> & {
  createUser(user: UserDTO): Promise<User>;
  updateUser(id: number, user: UserDTO): Promise<User | null>;
  getUsersByIds(ids: number[]): Promise<User[]>;
  getUsers(
    limit?: number,
    offset?: number,
    orderBy?: keyof User,
    order?: Order
  ): Promise<FormattedResponse<User>>;
};

export const userRepository: UserRepository = dataSource.getRepository(User).extend({
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
  },

  async updateUser(id: number, user: UserDTO) {
    try {
      await this.update(id, user);
      const updatedUser = await this.findOneBy({ id });
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
  },

  getUsersByIds(ids: number[]) {
    return this.find({
      where: { id: In(ids) },
    });
  },

  async getUsers(limit?: number, offset?: number, orderBy?: keyof User, order?: Order) {
    const findOptions: FindOptions<User> = {
      skip: offset,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    };

    if (order !== undefined && orderBy !== undefined) {
      findOptions.order = {
        [orderBy]: order,
      };
    }

    const data = await this.findAndCount(findOptions);

    return formatFindAndCountResponse<User>(data);
  },
});
