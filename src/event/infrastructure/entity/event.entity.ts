import { User } from "../../../users/infrastructure/entity/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  event_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: "id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
