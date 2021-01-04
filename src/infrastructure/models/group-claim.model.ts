import { Model, Table, Column, ForeignKey } from "sequelize-typescript";

import { Group } from "@infrastructure/models/group.model";
import { Claim } from "@infrastructure/models/claim.model";

@Table({
    timestamps: true,
    tableName: "group_claim"
})
export class GroupClaim extends Model<GroupClaim> {
    @Column({ field: "group_claim_id", primaryKey: true })
    groupClaimId!: string;

    @ForeignKey(() => Group)
    @Column({ field: "group_id" })
    groupId!: string;

    @ForeignKey(() => Claim)
    @Column({ field: "claim_id" })
    claimId!: string;
}