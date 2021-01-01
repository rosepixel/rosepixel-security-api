import { injectable } from "inversify";

import { User } from "@infrastructure/models/user.model";

import { IUser } from "@domain/models/user.model";

import { IUserRepository } from "@domain/interfaces/user.repository";

@injectable()
export class UserRepository implements IUserRepository {
    public async getById(user_id: string): Promise<IUser | null> {

        const user: IUser | null = await User.findByPk(user_id, {
            attributes: ["user_id", "username", "email", "created_at", "updated_at"]
        });

        return user;
    }
}