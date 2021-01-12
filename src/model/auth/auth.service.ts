import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { compareSync } from "bcrypt";

import { RedisCacheService } from "@app/configuration/cache/redis/redis-cache.service";

import { AuthInput } from "@model/auth/dto/auth.input";
import { AuthType } from "@model/auth/dto/auth.type";

import { User } from "@model/user/user.entity";
import { UserService } from "@model/user/user.service";
import { Logger } from "@nestjs/common";

const logger = new Logger("SecurityAPI");


@Injectable()
export class AuthService {
    constructor(
        private redisCacheService: RedisCacheService,
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

        await this.redisCacheService.set(`session:${token}`, JSON.stringify(user));
    
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
