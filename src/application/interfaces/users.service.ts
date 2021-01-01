import { UserResponse } from "@application/responses/user.response";

export interface IUserService {
    getById(id: string): Promise<UserResponse>;
}