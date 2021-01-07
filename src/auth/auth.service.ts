import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
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

        const token = await this.jwt(user);

        return {
            user,
            token
        }
    }

    private async jwt(user: User): Promise<string> {
        const payload = { username: user.name, sub: user.userId };

        return await this.jwtService.signAsync(payload);
    }
}
