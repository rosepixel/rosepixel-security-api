import { IUserResponse } from "@application/responses/user.response";
import { ISessionResponse } from "@application/responses/session.response";
import { ISignInRequest } from "@application/requests/sign-in.request";

export interface IUsersAppService {
    register(username: string, email: string, password: string): Promise<void>;
    signIn(signInRequest: ISignInRequest): Promise<ISessionResponse>;
    getById(id: string): Promise<IUserResponse>;
}