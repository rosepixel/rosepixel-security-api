import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Policy } from 'src/models/policy/policy.entity';

import { User } from 'src/models/user/user.entity';
import { UserService } from 'src/models/user/user.service';
import { UserResolver } from 'src/models/user/user.resolver';
import { Group } from '@models/group/group.entity';
import { Claim } from '@models/claim/claim.entity';
import { Role } from '@models/role/role.entity';

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
