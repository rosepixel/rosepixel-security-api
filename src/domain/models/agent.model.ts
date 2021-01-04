import { IUser } from "@domain/models/user.model";

export interface IAgent {
    agentId: string;
    browser: string;
    createdAt: Date;
    user: IUser;
}