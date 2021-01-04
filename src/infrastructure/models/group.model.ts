import { Model, Table, Column, PrimaryKey, HasMany, BelongsToMany, BelongsTo } from "sequelize-typescript";

import { IGroup } from "@domain/models/group.model";

import { Role } from "@infrastructure/models/role.model";
import { Claim } from "@infrastructure/models/claim.model";
import { GroupRole } from "@infrastructure/models/group-role.model";
import { GroupClaim } from "@infrastructure/models/group-claim.model";

@Table({
    timestamps: true,
    tableName: "group"
})
export class Group extends Model<Group> implements IGroup {
    @Column({ field: "group_id", primaryKey: true })
    groupId!: string;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column({ field: "created_at" })
    createdAt!: Date;

    @BelongsToMany(() => Role, () => GroupRole)
    roles!: Role[];

    @BelongsToMany(() => Claim, () => GroupClaim)
    claims!: Claim[];
}