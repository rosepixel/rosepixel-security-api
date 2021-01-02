import { inject, injectable } from "inversify";

import { INJECTION } from "@utilities/injection";

import { cryptography } from "@utilities/cryptography";

import { User } from "@infrastructure/models/user.model";

import { IUser } from "@domain/models/user.model";

import { IUserRepository } from "@domain/interfaces/user.repository";
import { IRedisService } from "@utilities/interfaces/redis";
import { RedisService } from "@utilities/redis";

@injectable()
export class UserRepository implements IUserRepository {

    private readonly _secret: string;

    constructor() {
        this._secret = String(process.env.SEVER_SECRET);
    }

    public async register(username: string, email: string, password: string): Promise<IUser> {
        const encrypted = cryptography.hash(password, this._secret);

        const secret = cryptography.secret();
        const iv = cryptography.iv();

        return await User.create({
            username,
            email,
            password: encrypted,
            secret,
            iv
        });
    }

    public async getByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
        const encrypted = cryptography.hash(password, this._secret);

        const user: IUser | null = await User.findOne({
            where: {
                email,
                password: encrypted
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