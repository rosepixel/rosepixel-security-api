import { injectable } from "inversify";

import { cryptography } from "@utilities/cryptography";

import { User } from "@infrastructure/models/user.model";

import { IUser } from "@domain/models/user.model";

import { IUserRepository } from "@domain/interfaces/user.repository";

@injectable()
export class UserRepository implements IUserRepository {

    public async register({ username, email, password }: IUser): Promise<IUser> {
        const secret = cryptography.secret();
        const iv = cryptography.iv();

        const hash = cryptography.hash(password, secret);

        return await User.create({
            username,
            email,
            password: hash,
            secret,
            iv
        });
    }

    public async signIn({ email, password, secret }: IUser) {
        const hash = cryptography.hash(password, secret);

        const user: IUser | null = await User.findOne({
            where: {
                email,
                password: hash
            }
        });

        return user;
    }

    public async signOut(): Promise<void> {

    }

    public async getById(user_id: string): Promise<IUser | null> {

        const user: IUser | null = await User.findByPk(user_id, {
            attributes: [
                "user_id",
                "username",
                "email",
                "created_at",
                "updated_at"
            ]
        });

        return user;
    }
}