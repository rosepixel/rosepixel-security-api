import { Model, Table, Column, PrimaryKey, DataType } from "sequelize-typescript";

import { IClaim } from "@domain/models/claim.model";

@Table({
    timestamps: true,
    tableName: "claim"
})
export class Claim extends Model<Claim> implements IClaim {
    @Column({ field: "claim_id", primaryKey: true })
    claimId!: string;

    @Column
    type!: string;

    @Column
    key!: string;

    @Column
    value!: string;

    @Column
    description!: string;
}