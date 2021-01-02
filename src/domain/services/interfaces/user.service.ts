import { IUser } from "@domain/models/user.model";

export interface IUserService {
    validateById(user_id: string): Promise<IUser>;
    validateByEmailAndPassword(email: string, password: string): Promise<IUser>;
}