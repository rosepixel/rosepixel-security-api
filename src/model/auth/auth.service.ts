import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Guid } from "guid-typescript";
import { compareSync } from "bcrypt";

import { RedisCacheService } from "@app/configuration/cache/redis/redis-cache.service";

import { AuthInput } from "@model/auth/dto/auth.input";
import { AuthType } from "@model/auth/dto/auth.type";

import { UserService } from "@model/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private redisCacheService: RedisCacheService,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(data: AuthInput): Promise<AuthType> {
        const user = await this.userService.getUserByEmail(data.email);

        const validPassword = compareSync(data.password, user.password);

        if (!validPassword) {
            throw new UnauthorizedException("Email e senha incorretos.")
        }

        const session = Guid.raw();

        const payload = {
            user_id: user.user_id,
            name: user.name,
            session: session
        };

        await this.redisCacheService.client().set(`session:${payload.session}`, JSON.stringify(user), 1);


        const token = await this.jwtService.signAsync(payload);

        return {
            user,
            token
        } as AuthType
    }

    public async logout(token: string): Promise<void> {
        const decoded = this.jwtService.decode(token) as any;
        this.redisCacheService.client().del(`session:${decoded.session}`);
    }
}
