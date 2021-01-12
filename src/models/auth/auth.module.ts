import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from '@models/auth/auth.resolver';
import { AuthService } from '@models/auth/auth.service';
import { JwtStrategy } from '@common/helpers/jwt.strategy';

import { User } from '@models/user/user.entity';
import { UserService } from '@models/user/user.service';
import { JwtConfig } from '@app/config/jwt/jwt.config';
import { RedisService } from '@app/config/cache/redis/redis.service';
import { CacheModule } from '@nestjs/common';
import { RedisCacheModule } from '@app/config/cache/redis/redis.module';

@Module({
    imports: [
        RedisCacheModule,
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: JwtConfig.JWT_SECRET
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
