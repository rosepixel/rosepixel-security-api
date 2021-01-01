import { Model, DataTypes } from "sequelize";

import { database } from "@utilities/database/database";
import { uuid } from "@utilities/functions/uuid";

import { IUser } from "@domain/models/user.model";

export interface IUserAttributes extends Model<IUserAttributes, IUser> {
    user_id: string;
    username: string;
}

export const User = database.connection.define<IUserAttributes, IUser>("user", {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: "user"
});