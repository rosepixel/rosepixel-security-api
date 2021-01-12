import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CACHE_MANAGER } from "@nestjs/common";

import { Cache } from "cache-manager";
import { compareSync } from "bcrypt";

import { RedisService } from "@config/cache/redis/redis.service";

import { AuthInput } from "@models/auth/dto/auth.input";
import { AuthType } from "@models/auth/dto/auth.type";

import { User } from "@models/user/user.entity";
import { UserService } from "@models/user/user.service";
import { Logger } from "@nestjs/common";

const logger = new Logger("SecurityAPI");


@Injectable()
export class AuthService {
    constructor(
        private redisService: RedisService,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(data: AuthInput): Promise<AuthType> {
        const user = await this.userService.getUserByEmail(data.email);

        const validPassword = compareSync(data.password, user.password);

        if (!validPassword) {
            throw new UnauthorizedException("Email e senha incorretos.")
        }

        const token = await this.login(user);

        await this.redisService.set(`session:${token}`, JSON.stringify(user));
    
        return {
            user,
            token
        }
    }

    private async login(user: User): Promise<string> {
        const payload = { username: user.name, sub: user.user_id };

        return await this.jwtService.signAsync(payload);
    }
}
