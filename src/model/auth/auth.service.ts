import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Guid } from "guid-typescript";
import { compareSync } from "bcrypt";

import { RedisCacheService } from "@app/configuration/cache/redis/redis-cache.service";

import { AuthInput } from "@model/auth/dto/auth.input";
import { AuthType } from "@model/auth/dto/auth.type";

import { User } from "@model/user/user.entity";
import { UserService } from "@model/user/user.service";

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

        return {
            user,
            token
        }
    }

    private async login(user: User): Promise<string> {
        const session = Guid.create();

        const payload = {
            username: user.name,
            sub: user.user_id,
            session: session
        };

        const token = await this.jwtService.signAsync(payload);
        const key = `session:${session}`;
        const value = JSON.stringify(user);

        await this.redisCacheService.set(key, value, 1);

        return token;
    }

    public async logout(token: string): Promise<void> {
        const payload = this.jwtService.decode(token) as any;
        await this.redisCacheService.del(payload.session.value);
    }
}
