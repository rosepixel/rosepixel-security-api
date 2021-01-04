import { Model, Table, Column, PrimaryKey } from "sequelize-typescript";

import { IRole } from "@domain/models/role.model";

@Table({
    timestamps: true,
    tableName: "role"
})
export class Role extends Model<Role> implements IRole {
    @Column({ field: "role_id", primaryKey: true })
    roleId!: string;

    @Column
    name!: string;

    @Column
    description!: string;
}