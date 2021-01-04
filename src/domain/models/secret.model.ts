import { IUser } from "./user.model";

export interface ISecret {
    secretId: string;
    user: IUser;
    secret: string;
    vector: string;
    createdAt: Date;
}