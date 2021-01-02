import { UserResponse } from "@application/responses/user.response";

export interface IUserAppService {
    register(username: string, email: string, password: string): Promise<UserResponse>;
    signIn(email: string, password: string): Promise<UserResponse>;
    getById(id: string): Promise<UserResponse>;
}