import { injectable, inject } from "inversify";

import { INJECTION } from "@utilities/injection";

import { IRedisService } from "@utilities/interfaces/redis";
import { RedisService } from "@utilities/redis";

import { IUserAppService } from "@application/interfaces/users.service";
import { UserResponse } from "@application/responses/user.response";

import { IUser } from "@domain/models/user.model";
import { IUserService } from "@domain/services/interfaces/user.service";
import { UserService } from "@domain/services/user.service";
import { UserRepository } from "@infrastructure/repositories/user.repository";
import { IUserRepository } from "@domain/interfaces/user.repository";

@injectable()
export class UserAppService implements IUserAppService {

    private readonly _redisService: IRedisService;
    private readonly _userService: IUserService;
    private readonly _userRepository: IUserRepository;

    constructor(
        @inject(INJECTION.IRedisService) redisService: RedisService,
        @inject(INJECTION.IUserService) userService: UserService,
        @inject(INJECTION.IUserRepository) userRepository: UserRepository
    ) {
        this._redisService = redisService;
        this._userService = userService;
        this._userRepository = userRepository;
    }

    async register(username: string, email: string, password: string): Promise<UserResponse> {
        const user: IUser = await this._userRepository.register(username, email, password);

        return new UserResponse(
            user.user_id,
            user.username,
            user.email,
            user.created_at,
            user.updated_at
        );
    }

    async signIn(email: string, password: string): Promise<UserResponse> {
        const user: IUser = await this._userService.validateByEmailAndPassword(email, password);

        const session = "";

        this._redisService.client.sadd("session", `user:${session}`);
        this._redisService.client.hmset(`user:${session}`, String(user.user_id), user.username);

        return new UserResponse(
            user.user_id,
            user.username,
            user.email,
            user.created_at,
            user.updated_at
        );
    }

    async getById(user_id: string): Promise<UserResponse> {
        const user: IUser = await this._userService.validateById(user_id);

        return new UserResponse(
            user.user_id,
            user.username,
            user.email,
            user.created_at,
            user.updated_at
        );
    }
}