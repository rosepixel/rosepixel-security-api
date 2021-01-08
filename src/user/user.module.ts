import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Policy } from 'src/policy/policy.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Policy])
    ],
    providers: [
        UserService,
        UserResolver
    ]
})
export class UserModule { }
