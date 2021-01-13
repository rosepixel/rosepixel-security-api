import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "@model/user/user.entity";
import { UserService } from "@model/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET")
        });
    }

    async validate(payload: { sub: User["user_id"], name: string }): Promise<User> {
        const user = this.userService.getUserById(payload.sub);

        if (!user) {
            throw new UnauthorizedException("Usuário não autorizado.");
        }

        return user;
    }
}