import { ConfigModule } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as RedisStore from "cache-manager-redis-store";
import * as Joi from '@hapi/joi';

import { join } from 'path';

import { UserModule } from '@models/user/user.module';
import { AuthModule } from '@models/auth/auth.module';
import { RoleModule } from '@models/role/role.module';
import { ClaimModule } from '@models/claim/claim.module';
import { PolicyModule } from '@models/policy/policy.module';
import { GroupModule } from '@models/group/group.module';
import { MySqlConfig } from '@app/config/database/mysql/mysql.config';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { REDIS_CONFIG } from '@config/cache/redis/redis.config';
import { RedisService } from '@config/cache/redis/redis.service';

@Module({
    imports: [
        // CacheModule.register({
        //     store: RedisStore,
        //     host: REDIS_CONFIG.HOST,
        //     port: REDIS_CONFIG.PORT,
        //     auth_pass: REDIS_CONFIG.PASSWORD,
        //     db: REDIS_CONFIG.DB_NUMBER
        // }),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("development", "test", "staging", "production"),
                SERVER_PORT: Joi.number(),
                ORM_HOST: Joi.string(),
                ORM_PORT: Joi.number(),
                ORM_USERNAME: Joi.string(),
                ORM_PASSWORD: Joi.string(),
                ORM_DATABASE: Joi.string(),
                ORM_SYNC: Joi.boolean().default(true),
                JWT_SECRET: Joi.string()
            }),
            envFilePath: ".env",
            ignoreEnvFile: process.env.NODE_ENV !== "development"
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req }) => ({ req })
        }),
        TypeOrmModule.forRoot(MySqlConfig as TypeOrmModule),
        AuthModule,
        UserModule,
        RoleModule,
        ClaimModule,
        PolicyModule,
        GroupModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        }
    ]
})
export class AppModule { }
