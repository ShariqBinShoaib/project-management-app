import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import Model from "./Model";
import { User } from "./User";

@Entity("projects")
export class Project extends Model<Project> {
  @Column()
  name: string;

  @Column({ unique: true })
  key: string;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  users: User[];
}
