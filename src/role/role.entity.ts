import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Role {
    @PrimaryGeneratedColumn("uuid", {
        name: "role_id"
    })
    roleId: string;

    @Column()
    name: string;

    @Column()
    description: string;
}