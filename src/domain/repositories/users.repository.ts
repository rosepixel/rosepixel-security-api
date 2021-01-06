import { IUser } from "@domain/models/user.model";

export interface IUsersRepository {
    create(user: IUser): Promise<IUser>;
    getByEmailAndPassword(email: string, password: string): Promise<IUser | null>;
    getById(userId: string): Promise<IUser | null>;
}