import { Model, DataTypes } from "sequelize";

import { database } from "@utilities/database";

import { IUser } from "@domain/models/user.model";

export interface IUserAttributes extends Model<IUserAttributes, IUser> {
    user_id?: string;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    secret: string;
    iv: string;
}

export const User = database.connection.define<IUserAttributes, IUser>("user", {
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: 'TIMESTAMP',
        allowNull: true
    },
    updated_at: {
        type: 'TIMESTAMP',
        allowNull: true
    },
    secret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iv: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: "user"
});