import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';

import * as Joi from '@hapi/joi';

import { join } from 'path';

import { RolesGuard } from '@models/role/role.guard';
import { UserModule } from '@models/user/user.module';
import { AuthModule } from '@models/auth/auth.module';
import { RoleModule } from '@models/role/role.module';
import { ClaimModule } from '@models/claim/claim.module';
import { PolicyModule } from '@models/policy/policy.module';
import { GroupResolver } from '@models/group/group.resolver';
import { GroupModule } from '@models/group/group.module';
import { MySqlConfig } from '@config/databases/mysql/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

console.log(process.env.ORM_PASSWORD)
@Module({
    imports: [
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
