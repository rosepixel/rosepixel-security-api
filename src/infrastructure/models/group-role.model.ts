import { Model, Table, Column, ForeignKey } from "sequelize-typescript";

import { Group } from "@infrastructure/models/group.model";
import { Role } from "@infrastructure/models/role.model";

@Table({
    timestamps: true,
    tableName: "group_role"
})
export class GroupRole extends Model<GroupRole> {
    @Column({ field: "group_role_id", primaryKey: true })
    groupRoleId!: string;

    @ForeignKey(() => Group)
    @Column({ field: "group_id" })
    groupId!: string;

    @ForeignKey(() => Role)
    @Column({ field: "role_id" })
    roleId!: string;
}