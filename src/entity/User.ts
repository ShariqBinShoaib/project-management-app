import { IsEmail, Length } from "class-validator";
import { Entity, Column, ManyToOne } from "typeorm";
import Model from "./Model";
import { Role } from "./Role";

@Entity("users")
export class User extends Model<User> {
  @Length(3, 255)
  @Column()
  name: string;

  @Length(6, 255)
  @IsEmail()
  @Column()
  email: string;

  @Length(8, 255)
  @Column()
  password: string;

  @ManyToOne(() => Role)
  role: string;
}
