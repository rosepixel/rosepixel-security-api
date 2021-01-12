import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Policy } from '@model/policy/policy.entity';
import { User } from '@model/user/user.entity';
import { Group } from '@model/group/group.entity';
import { Claim } from '@model/claim/claim.entity';
import { Role } from '@model/role/role.entity';
import { UserResolver } from '@model/user/user.resolver';
import { UserService } from '@model/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Policy, Group, Claim, Role])
    ],
    providers: [
        UserService,
        UserResolver
    ]
})
export class UserModule { }
