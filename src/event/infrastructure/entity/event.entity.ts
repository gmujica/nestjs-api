
import { User } from "../../../users/infrastructure/entity/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, Generated, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    event_id: string;

    @Column()
    title: string;

    @Column()
    descrption: string;
    
    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: 'id ' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
    
}


