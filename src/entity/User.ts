import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import Model from "./Model";
import { Project } from "./Project";
import { Role } from "./Role";

@Entity("users")
export class User extends Model<User> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "roleId" })
  role: Role;

  @Column()
  roleId: number;

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  toJSON() {
    return { ...this, password: undefined };
  }
}
