import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, OneToMany, BeforeInsert } from "typeorm";
import { Event } from '../../../event/infrastructure/entity/event.entity'
import * as bcrypt from 'bcrypt';
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

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
    
    @OneToMany(() => Event, event => event.user)
    events: Event[];

    // Hash the password before inserting it into the database
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
}