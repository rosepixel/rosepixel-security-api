import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { REDIS_CONFIG } from './redis.config';
import { RedisService } from './redis.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: REDIS_CONFIG.HOST,
                port: REDIS_CONFIG.PORT,
                auth_pass: REDIS_CONFIG.PASSWORD,
                db: REDIS_CONFIG.DB_NUMBER
            })
        })
    ],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisCacheModule { }