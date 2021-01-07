import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '3000000s'
                }
            })
        })
    ],
    providers: [
        AuthResolver,
        AuthService,
        UserService,
        JwtStrategy
    ]
})
export class AuthModule { }
