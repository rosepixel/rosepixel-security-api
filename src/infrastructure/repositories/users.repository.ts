import { injectable } from "inversify";

import { IUser } from "@domain/models/user.model";

import { User } from "@infrastructure/models/user.model";

import { IUsersRepository } from "@domain/repositories/users.repository";

@injectable()
export class UsersRepository implements IUsersRepository {

    constructor() { }

    public async create(user: IUser): Promise<IUser> {
        return await User.create(user);
    }

    public async getByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
        const user: User | null = await User.findOne({ where: { email, password } });

        if (user === null) return null;

        return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        } as IUser;
    }

    public async getById(user_id: string): Promise<IUser | null> {
        const user: User | null = await User.findByPk(user_id, {
            attributes: [
                "user_id",
                "username",
                "email",
                "created_at",
                "updated_at"
            ]
        });

        if (user === null) return null;

        return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        } as IUser;
    }
}