import { UserResponse } from "@application/responses/user.response";

export interface IUserAppService {
    getById(id: string): Promise<UserResponse>;
}