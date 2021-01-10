import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Group } from "src/group/group.entity";
import { Role } from "src/role/role.entity";
import { Claim } from "src/claim/claim.entity";
import { User } from "src/user/user.entity";

@ObjectType()
@Entity()
export class Policy {
    @PrimaryGeneratedColumn("uuid")
    policy_id: string;

    @Column()
    created_at: Date;

    @Column()
    expires_at?: Date;

    @OneToMany(() => User, (user) => user.policies)
    user: User;

    @ManyToMany(() => Group, { eager: false })
    @JoinTable({
        name: "policy_group",
        joinColumn: { name: "policy_id", referencedColumnName: "policy_id" },
        inverseJoinColumn: { name: "group_id", referencedColumnName: "group_id" }
    })
    groups: Group[];
}