import {
  Entity,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Model from "./Model";
import { User } from "./User";
import { Task } from "./Task";

@Entity("comments")
@Tree("closure-table")
export class Comment extends Model<Comment> {
  @Column()
  taskId: number;

  @ManyToOne(() => Task)
  @JoinColumn({ name: "taskId" })
  task: Task;

  @Column()
  authorId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "authorId" })
  author: User;

  @Column()
  text: string;

  @TreeChildren()
  children: Comment[];

  @TreeParent()
  parent: Comment;
}
