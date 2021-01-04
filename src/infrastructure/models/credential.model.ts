import { Model, Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";

import { ICredential } from "@domain/models/credential.model";

import { User } from "@infrastructure/models/user.model";

@Table({
    timestamps: true,
    tableName: "user"
})
export class Credential extends Model<Credential> implements ICredential {
    @Column({ field: "credential_id", primaryKey: true })
    credentialId!: string;

    @Column({ field: "user_id" })
    @ForeignKey(() => User)
    userId!: string;

    @BelongsTo(() => User)
    user!: User;

    @Column
    password!: string;

    @Column
    situation!: string;

    @Column({ field: "verification_token" })
    verificationToken!: string;

    @Column({ field: "created_at" })
    createdAt!: Date;

    @Column({ field: "expired_at" })
    expiredAt!: Date;
}