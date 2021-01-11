import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Role } from "src/models/role/role.entity";
import { Claim } from "src/models/claim/claim.entity";

@ObjectType()
@Entity()
export class Group {
    @PrimaryGeneratedColumn("uuid")
    group_id: string;

    @Column()
    name: string;

    @Column()
    created_at: Date;

    @ManyToMany(() => Role, { eager: false })
    @JoinTable({
        name: "group_role",
        joinColumn: { name: "group_id", referencedColumnName: "group_id" },
        inverseJoinColumn: { name: "role_id", referencedColumnName: "role_id" }
    })
    roles: Role[];

    @ManyToMany(() => Claim, { eager: false })
    @JoinTable({
        name: "group_claim",
        joinColumn: { name: "group_id", referencedColumnName: "group_id" },
        inverseJoinColumn: { name: "claim_id", referencedColumnName: "claim_id" }
    })
    claims: Claim[];
}