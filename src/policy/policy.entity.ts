import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Group } from "src/group/group.entity";
import { Role } from "src/role/role.entity";
import { Claim } from "src/claim/claim.entity";
import { User } from "src/user/user.entity";

@ObjectType()
@Entity()
export class Policy {
    @PrimaryGeneratedColumn("uuid", {
        name: "policy_id"
    })
    policyId: string;

    @Column({ name: "created_at" })
    createdAt: Date;

    @Column({ name: "expires_at" })
    expiresAt?: Date;

    @ManyToOne(() => User, (user) => user.policies)
    user: User;

    @ManyToMany(() => Group)
    @JoinTable({
        name: "policy_group",
        joinColumn: { name: "policy_id", referencedColumnName: "policy_id" },
        inverseJoinColumn: { name: "group_id", referencedColumnName: "group_id" }
    })
    groups: Group[];

    @ManyToMany(() => Policy, (policy) => policy.roles, { eager: false })
    @JoinTable({
        name: "policy_role",
        joinColumn: { name: "policy_id", referencedColumnName: "policy_id" },
        inverseJoinColumn: { name: "role_id", referencedColumnName: "role_id" }
    })
    roles: Role[];

    @ManyToMany(() => Policy, (policy) => policy.claims, { eager: false })
    @JoinTable({
        name: "policy_claim",
        joinColumn: { name: "policy_id", referencedColumnName: "policy_id" },
        inverseJoinColumn: { name: "claim_id", referencedColumnName: "claim_id" }
    })
    claims: Claim[];
}