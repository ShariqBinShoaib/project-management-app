import { Entity, Column, ManyToOne } from "typeorm";
import Model from "./Model";
import { User } from "./User";

@Entity("roles")
export class Role extends Model<Role> {
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.role)
  users: User[];
}
