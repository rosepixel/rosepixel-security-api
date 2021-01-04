import { Model, Table, Column, ForeignKey } from "sequelize-typescript";

import { User } from "@infrastructure/models/user.model";
import { Policy } from "@infrastructure/models/policy.model";

@Table({
    timestamps: true,
    tableName: "user_policy"
})
export class UserPolicy extends Model<UserPolicy> {
    @Column({ field: "user_policy_id", primaryKey: true })
    userPolicyId!: string;

    @ForeignKey(() => User)
    @Column({ field: "user_id" })
    userId!: string;

    @ForeignKey(() => Policy)
    @Column({ field: "policy_id" })
    policyId!: string;
}