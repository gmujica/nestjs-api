import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    event_id: number;

    @Column()
    title: string;

    @Column()
    descrption: string;
}