import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Role {
    @PrimaryGeneratedColumn("uuid")
    role_id: string;

    @Column()
    name: string;
}