import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { RedisCacheModule } from '@configuration/cache/redis/redis-cache.module';

import { JwtStrategy } from '@common/helpers/jwt.strategy';

import { AuthResolver } from '@model/auth/auth.resolver';
import { AuthService } from '@model/auth/auth.service';

import { User } from '@model/user/user.entity';
import { UserService } from '@model/user/user.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        RedisCacheModule,
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET")
            }),
            inject: [ConfigService]
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
