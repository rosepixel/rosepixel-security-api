import { Model, Table, Column, UpdatedAt, CreatedAt, PrimaryKey, HasMany, HasOne, BelongsToMany } from "sequelize-typescript";

import { Credential } from "@infrastructure/models/credential.model";
import { Secret } from "@infrastructure/models/secret.model";
import { Agent } from "@infrastructure/models/agent.model";
import { Policy } from "./policy.model";
import { UserPolicy } from "./user-policy.model";

@Table({
    timestamps: true,
    tableName: "user"
})
export class User extends Model<User> {
    @Column({ field: "user_id", primaryKey: true })
    userId!: string;

    @Column
    username!: string;

    @Column
    email!: string;

    @Column
    password!: string;

    @Column({ field: "created_at" })
    createdAt!: Date;

    @Column({ field: "updated_at" })
    updatedAt!: Date;

    @HasMany(() => Credential)
    credentials!: Credential[];

    @HasOne(() => Secret)
    secret!: Secret;

    @HasMany(() => Agent)
    agents!: Agent[];

    @BelongsToMany(() => Policy, () => UserPolicy)
    policies!: Policy[];
}