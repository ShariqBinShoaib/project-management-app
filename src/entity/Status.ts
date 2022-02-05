import { Entity, Column } from "typeorm";
import Model from "./Model";

@Entity("status")
export class Status extends Model<Status> {
  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  isDefault: boolean;
}
