import { JwtConfig } from "@config/jwt/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "src/models/user/user.entity";
import { UserService } from "src/models/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JwtConfig.JWT_SECRET
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