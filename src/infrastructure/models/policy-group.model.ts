import { Model, Table, Column, ForeignKey } from "sequelize-typescript";

import { Policy } from "@infrastructure/models/policy.model";
import { Group } from "@infrastructure/models/group.model";

@Table({
    timestamps: true,
    tableName: "policy_group"
})
export class PolicyGroup extends Model<PolicyGroup> {
    @Column({ field: "policy_group_id", primaryKey: true })
    policyGroupId!: string;

    @ForeignKey(() => Policy)
    @Column({ field: "policy_id" })
    policyId!: string;

    @ForeignKey(() => Group)
    @Column({ field: "group_id" })
    groupId!: string;
}