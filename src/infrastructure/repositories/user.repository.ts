import { injectable } from "inversify";

import { UserModel } from "@settings/database/models/user.model";

import { User } from "@domain/models/user.model";

import { IUserRepository } from "@domain/interfaces/user.repository";

@injectable()
export class UserRepository implements IUserRepository {
    public async getById(user_id: string): Promise<User> {
        const user: User = await UserModel
            .findByPk(user_id, {
                attributes: ["user_id", "username"]
            })
            .then((model: any) => {
                return new User(model.user_id, model.username);
            });

        return user;
    }
}