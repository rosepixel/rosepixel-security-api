import { injectable, inject } from "inversify";

import { environment } from "@environments/environment";

import { INJECTION } from "@utilities/injection";
import { cryptography } from "@utilities/cryptography";

import { IUser } from "@domain/models/user.model";
import { IUsersAppService } from "@application/interfaces/users.app-service";
import { IUsersService } from "@domain/services/interfaces/users.service";
import { IUsersRepository } from "@domain/repositories/users.repository";

import { ISignInRequest } from "@application/requests/sign-in.request";

import { IUserResponse } from "@application/responses/user.response";
import { ISessionResponse } from "@application/responses/session.response";

import { ISecret } from "@domain/models/secret.model";
import { ICredential } from "@domain/models/credential.model";
import { Secret } from "@infrastructure/models/secret.model";

@injectable()
export class UsersAppService implements IUsersAppService {

    constructor(
        // @inject(INJECTION.IRedisService) private redisService: IRedisService,

        @inject(INJECTION.IUsersService) private usersService: IUsersService,
        @inject(INJECTION.IUsersRepository) private usersRepository: IUsersRepository
    ) { }

    async register(username: string, email: string, password: string): Promise<void> {
        const hash = cryptography.hmac(password, environment.secret);

        const secret = cryptography.secret();
        const vector = cryptography.vector();

        await this.usersRepository.create({
            username,
            email,
            secret: {
                secret,
                vector
            } as ISecret,
            credentials: [{
                password: hash
            }] as ICredential[]
        } as IUser);
    }

    async signIn(request: ISignInRequest): Promise<ISessionResponse> {
        const { email, password } = request;

        const user: IUser = await this.usersService.validateByEmailAndPassword(email, password);

        const token = cryptography.jwt({
            userId: user.userId,
            email: user.email,
            password: user.password
        }, environment.secret);

        const response = {
            user: {
                userId: user.userId,
                username: user.username,
                email: user.email
            },
            token: token
        } as ISessionResponse;


        // this.redisService.client.sadd("session", `user:${token}`);
        // this.redisService.client.hmset(`user:${token}`,
        //     response.user.user_id,
        //     signInRequest.userAgent.browser,
        //     signInRequest.userAgent.os,
        //     signInRequest.userAgent.platform,
        //     signInRequest.userAgent.source,
        //     signInRequest.userAgent.version
        // );

        return response;
    }

    async getById(user_id: string): Promise<IUserResponse> {
        const user: IUser = await this.usersService.validateById(user_id);

        return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        } as IUserResponse;
    }
}