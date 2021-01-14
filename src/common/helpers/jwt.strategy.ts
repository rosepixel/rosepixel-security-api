import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { RedisCacheService } from "@configuration/cache/redis/redis-cache.service";

import { User } from "@model/user/user.entity";
import { UserService } from "@model/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly redisCacheService: RedisCacheService,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET")
        });
    }

    async validate(payload: { user_id: User["user_id"], name: string, session: string }): Promise<User> {
        const user = this.userService.getUserById(payload.user_id);
        const session = await this.redisCacheService.client().get(`session:${payload.session}`);

        if (!user || !session) {
            throw new UnauthorizedException("Usuário não autorizado.");
        }

        return user;
    }
}