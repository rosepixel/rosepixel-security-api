import { Model, STRING } from "sequelize";

import { database } from "@settings/database/database";

import { IUser } from "@domain/models/user.model";

export interface IUserAttributes extends Model<IUserAttributes, IUser> {
    user_id: string;
    username: string;
}

export const User = database.connection.define<IUserAttributes, IUser>("user", {
    user_id: {
        type: STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: "user"
});