import { User } from "src/users/infrastructure/entity/user.entity";
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

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'id ' })
    id : string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
    
}


