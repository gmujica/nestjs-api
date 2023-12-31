import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, OneToMany } from "typeorm";
import { Event } from '../../../event/infrastructure/entity/event.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: false })
  isLoggedIn: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @OneToMany(() => Event, event => event.user)
  events: Event[];
}
