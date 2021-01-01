import { IUser } from "@domain/models/user.model";

export interface IUserService {
    validate(user_id: string): Promise<IUser>;
}