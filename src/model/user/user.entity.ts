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

    @Exclude()
    @Column()
    verification_token?: string;

    @Exclude()
    @Column()
    verification_token_submissions?: number;

    @Exclude()
    @Column({ type: "timestamp" })
    verification_token_created_at?: Date;

    @Exclude()
    @Column()
    reset_password_token?: string;

    @Exclude()
    @Column({ type: "timestamp" })
    reset_password_created_at?: Date;

    @Exclude()
    @Column()
    is_verified?: boolean;

    @Exclude()
    @OneToMany(() => Policy, (policy) => policy.user)
    policies: Policy[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
}