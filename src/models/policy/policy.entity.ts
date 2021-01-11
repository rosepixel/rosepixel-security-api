import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Group } from "src/models/group/group.entity";
import { User } from "src/models/user/user.entity";

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