import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

import { UserService } from 'src/models/user/user.service';
import { User } from 'src/models/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
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
        const payload = { username: user.name, sub: user.user_id };

        return await this.jwtService.signAsync(payload);
    }
}
