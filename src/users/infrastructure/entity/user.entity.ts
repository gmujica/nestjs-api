import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
}