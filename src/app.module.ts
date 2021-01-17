import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from "nestjs-pino";
import { join } from 'path';

import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { KafkaModule } from "@common/kafka/kafka.module";

import { configuration } from '@configuration/configuration';
import { validate } from '@configuration/environment.validation';

import { UserModule } from '@model/user/user.module';
import { AuthModule } from '@model/auth/auth.module';
import { RoleModule } from '@model/role/role.module';
import { ClaimModule } from '@model/claim/claim.module';
import { PolicyModule } from '@model/policy/policy.module';
import { GroupModule } from '@model/group/group.module';

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
        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    pinoHttp: [{
                        level: configService.get("LOGGER_LEVEL")
                    }, configService.get("LOGGER_STREAM")]
                }
            }
        }),
        KafkaModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                clientId: configService.get("KAFKA_CLIENT_ID"),
                groupId: configService.get("KAFKA_GROUP_ID"),
                brokers: [configService.get("KAFKA_BROKER_1")]
            })
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get("DATABASE_HOST"),
                port: configService.get("DATABASE_PORT"),
                username: configService.get("DATABASE_USERNAME"),
                password: configService.get("DATABASE_PASSWORD"),
                database: configService.get("DATABASE_DATABASE"),
                entities: [Claim, Group, Policy, Role, User],
                synchronize: configService.get("DATABASE_SYNCHRONIZE")
            })
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
