import { IUser } from "@domain/models/user.model";

export interface IUsersRepository {
    create(user: IUser): Promise<void>;
    getByEmailAndPassword(email: string, password: string): Promise<IUser | null>;
    getById(userId: string): Promise<IUser | null>;
}