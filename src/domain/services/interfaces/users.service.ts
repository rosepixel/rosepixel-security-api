import { IUser } from "@domain/models/user.model";

export interface IUsersService {
    validateById(user_id: string): Promise<IUser>;
    validateByEmailAndPassword(email: string, password: string): Promise<IUser>;
}