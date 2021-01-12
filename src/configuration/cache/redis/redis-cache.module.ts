import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { RedisCacheService } from './redis-cache.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get("REDIS_HOST"),
                port: configService.get("REDIS_PORT"),
                auth_pass: configService.get("REDIS_PASSWORD"),
                db: configService.get("REDIS_DB_NUMBER")
            })
        })
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService]
})
export class RedisCacheModule { }