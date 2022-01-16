import { Entity, Column } from "typeorm";
import Model from "./Model";

@Entity("roles")
export class Role extends Model<Role> {
  @Column({ unique: true })
  name: string;
}
