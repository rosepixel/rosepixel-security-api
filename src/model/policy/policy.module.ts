import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Policy } from '@model/policy/policy.entity';
import { Claim } from '@model/claim/claim.entity';
import { Role } from '@model/role/role.entity';
import { Group } from '@model/group/group.entity';

import { PolicyService } from '@model/policy/policy.service';
import { PolicyResolver } from '@model/policy/policy.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([Policy, Claim, Role, Group])
    ],
    providers: [
        PolicyService,
        PolicyResolver
    ]
})
export class PolicyModule { }
