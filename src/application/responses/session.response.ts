import { IUserResponse } from "./user.response";

export interface ISessionResponse {
    user: IUserResponse,
    token: string
}