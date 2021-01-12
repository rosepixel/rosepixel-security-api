import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

import { hashPasswordTransform } from "@common/helpers/crypto";

import { Policy } from "@model/policy/policy.entity";

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude()
    @Column({ transformer: hashPasswordTransform })
    password?: string;

    @OneToMany(() => Policy, (policy) => policy.user)
    policies: Policy[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
}