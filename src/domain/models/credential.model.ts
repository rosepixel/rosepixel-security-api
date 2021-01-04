import { IUser } from "@domain/models/user.model";

export interface ICredential {
    credentialId: string;
    userId: string;
    user: IUser;
    password: string;
    situation: string;
    verificationToken: string;
    createdAt: Date;
    expiredAt?: Date;
}