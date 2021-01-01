import { IUser } from "@domain/models/user.model";

export interface IUserRepository {
    getById(id: string): Promise<IUser | null>;
}