import { ICredential } from "@domain/models/credential.model";
import { ISecret } from "@domain/models/secret.model";
import { IAgent } from "@domain/models/agent.model";

export interface IUser {
    userId: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    credentials: ICredential[];
    secret: ISecret;
    agents: IAgent[];
}