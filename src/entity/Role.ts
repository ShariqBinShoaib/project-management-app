import { Length } from "class-validator";
import { Entity, Column, ManyToOne } from "typeorm";
import Model from "./Model";
import { User } from "./User";

@Entity("roles")
export class Role extends Model<Role> {
  @Length(3, 255)
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.role)
  users: User[];
}
