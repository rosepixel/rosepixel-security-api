import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RolesGuard } from './role/role.guard';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ClaimModule } from './claim/claim.module';
import { PolicyModule } from './policy/policy.module';
import { GroupResolver } from './group/group.resolver';
import { GroupModule } from './group/group.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
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
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
        GroupResolver
    ]
})
export class AppModule { }
