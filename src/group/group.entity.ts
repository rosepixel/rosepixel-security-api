import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Role } from "src/role/role.entity";
import { Claim } from "src/claim/claim.entity";

@ObjectType()
@Entity()
export class Group {
    @PrimaryGeneratedColumn("uuid", {
        name: "group_id"
    })
    groupId: string;

    @Column()
    name: string;

    @Column({ name: "created_at" })
    createdAt: Date;

    @ManyToMany(() => Group, (group) => group.roles, { eager: false })
    @JoinTable()
    roles: Role[];

    @ManyToMany(() => Group, (group) => group.claims, { eager: false })
    @JoinTable()
    claims: Claim[];
}