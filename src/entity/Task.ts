import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Comment } from "./Comment";
import Model from "./Model";
import { Project } from "./Project";
import { Status } from "./Status";
import { User } from "./User";

@Entity("tasks")
export class Task extends Model<Task> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  statusId: number;

  @ManyToOne(() => Status, { eager: true })
  @JoinColumn({ name: "statusId" })
  status: Status;

  @Column()
  projectId: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "projectId" })
  project: Project;

  @Column()
  reporterId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "reporterId" })
  reporter: User;

  @Column()
  assigneeId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "assigneeId" })
  assignee: User;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];
}
