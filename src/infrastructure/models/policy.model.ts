import { Model, Table, Column, PrimaryKey, HasMany, BelongsToMany } from "sequelize-typescript";

import { IPolicy } from "@domain/models/policy.model";

import { Group } from "@infrastructure/models/group.model";
import { PolicyGroup } from "@infrastructure/models/policy-group.model";

@Table({
    timestamps: true,
    tableName: "policy"
})
export class Policy extends Model<Policy> implements IPolicy {
    @Column({ field: "policy_id", primaryKey: true })
    policyId!: string;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column({ field: "created_at" })
    createdAt!: Date;

    @BelongsToMany(() => Group, () => PolicyGroup)
    groups!: Group[]
}