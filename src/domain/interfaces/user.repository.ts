import { User } from "@domain/models/user.model";

export interface IUserRepository {
    getById(id: string): User;
}