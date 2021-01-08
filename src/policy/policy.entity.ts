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
    @JoinTable()
    groups: Group[];

    @ManyToMany(() => Policy, (policy) => policy.roles, { eager: false })
    @JoinTable()
    roles: Role[];

    @ManyToMany(() => Policy, (policy) => policy.claims, { eager: false })
    @JoinTable()
    claims: Claim[];
}