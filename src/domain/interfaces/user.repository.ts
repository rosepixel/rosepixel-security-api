import { IUser } from "@domain/models/user.model";

export interface IUserRepository {
    register(username: string, email: string, password: string): Promise<IUser>;
    getByEmailAndPassword(email: string, password: string): Promise<IUser | null>;
    getById(id: string): Promise<IUser | null>;
}