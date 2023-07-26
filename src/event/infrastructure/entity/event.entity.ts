import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    event_id: string;

    @Column()
    title: string;

    @Column()
    descrption: string;
}