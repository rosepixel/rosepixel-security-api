import { IUserAgentRequest } from "@application/requests/user-agent.request";

export interface ISignInRequest {
    email: string;
    password: string;
    userAgent: IUserAgentRequest
}