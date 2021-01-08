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
    @JoinTable({
        name: "group_role",
        joinColumn: { name: "group_id", referencedColumnName: "group_id" },
        inverseJoinColumn: { name: "role_id", referencedColumnName: "role_id" }
    })
    roles: Role[];

    @ManyToMany(() => Group, (group) => group.claims, { eager: false })
    @JoinTable({
        name: "group_claim",
        joinColumn: { name: "group_id", referencedColumnName: "group_id" },
        inverseJoinColumn: { name: "claim_id", referencedColumnName: "claim_id" }
    })
    claims: Claim[];
}