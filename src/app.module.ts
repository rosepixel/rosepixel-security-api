import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

import { UserModule } from '@model/user/user.module';
import { AuthModule } from '@model/auth/auth.module';
import { RoleModule } from '@model/role/role.module';
import { ClaimModule } from '@model/claim/claim.module';
import { PolicyModule } from '@model/policy/policy.module';
import { GroupModule } from '@model/group/group.module';

import { configuration } from '@configuration/configuration';

import { validate } from '@app/configuration/environment.validation';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

import { Claim } from "@model/claim/claim.entity";
import { Group } from "@model/group/group.entity";
import { Policy } from "@model/policy/policy.entity";
import { Role } from "@model/role/role.entity";
import { User } from "@model/user/user.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validate
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get("ORM_HOST"),
                port: configService.get("ORM_PORT"),
                username: configService.get("ORM_USERNAME"),
                password: configService.get("ORM_PASSWORD"),
                database: configService.get("ORM_DATABASE"),
                entities: [Claim, Group, Policy, Role, User],
                synchronize: configService.get("ORM_SYNCHRONIZE")
            }),
            inject: [ConfigService]
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req }) => ({ req })
        }),
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
        ConfigService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        }
    ]
})
export class AppModule { }
