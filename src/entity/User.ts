import { IsEmail, Length } from "class-validator";
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import Model from "./Model";
import { Project } from "./Project";
import { Role } from "./Role";

@Entity("users")
export class User extends Model<User> {
  @Length(3, 255)
  @Column()
  name: string;

  @Length(6, 255)
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Length(8, 255)
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
