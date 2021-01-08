import { ObjectType } from "@nestjs/graphql";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { hashPasswordTransform } from "src/common/helpers/crypto";
import { Policy } from "src/policy/policy.entity";
import { Exclude } from "class-transformer";

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid", {
        name: "user_id"
    })
    userId: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude()
    @Column({
        transformer: hashPasswordTransform
    })
    password: string;

    @OneToMany(() => Policy, (policy) => policy.user)
    policies: Policy[];

    @Column({ name: "created_at" })
    createdAt: Date;
}