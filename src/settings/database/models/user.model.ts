import { Model, STRING } from "sequelize";

import { database } from "@settings/database/database";

import { IUser } from "@domain/models/interfaces/user.model";

export interface IUserModel extends Model<IUserModel, IUser> {
    user_id: string;
    username: string;
}

export const UserModel = database.connection.define<IUserModel, IUser>("user", {
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