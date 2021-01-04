import { Model, Table, Column, CreatedAt, PrimaryKey, BelongsTo, DataType, ForeignKey } from "sequelize-typescript";

import { IAgent } from "@domain/models/agent.model";

import { User } from "@infrastructure/models/user.model";

@Table({
    timestamps: true,
    tableName: "agent"
})
export class Agent extends Model<Agent> implements IAgent {
    @Column({ field: "agent_id", primaryKey: true })
    agentId!: string;

    @Column({ field: "user_id" })
    @ForeignKey(() => User)
    userId!: string;

    @BelongsTo(() => User)
    user!: User;

    @Column
    browser!: string;

    @Column({ field: "created_at" })
    createdAt!: Date;
}