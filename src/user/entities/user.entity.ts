import { v4 } from "uuid";
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string = v4();

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ nullable: true })
  email_verification_token: string;

  @Column({ nullable: true })
  password_recovery_token: string;

  @CreateDateColumn({ type: "timestamptz", precision: 0 })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz", precision: 0 })
  updated_at: Date;

  @DeleteDateColumn({
    type: "timestamptz",
    precision: 0,
    nullable: true,
  })
  deleted_at: Date;
}
