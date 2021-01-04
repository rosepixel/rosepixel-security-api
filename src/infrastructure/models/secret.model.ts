import { Model, Table, Column, CreatedAt, PrimaryKey, BelongsTo, ForeignKey } from "sequelize-typescript";

import { ISecret } from "@domain/models/secret.model";

import { User } from "@infrastructure/models/user.model";

@Table({
    timestamps: true,
    tableName: "secret"
})
export class Secret extends Model<Secret> implements ISecret {
    @Column({ field: "secret_id", primaryKey: true })
    secretId!: string;

    @Column({ field: "user_id" })
    @ForeignKey(() => User)
    userId!: string;

    @BelongsTo(() => User)
    user!: User;

    @Column
    secret!: string;

    @Column
    vector!: string;

    @Column({ field: "created_at" })
    @CreatedAt
    createdAt!: Date;
}