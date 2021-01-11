import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Policy } from 'src/models/policy/policy.entity';
import { Claim } from 'src/models/claim/claim.entity';
import { Role } from 'src/models/role/role.entity';
import { Group } from 'src/models/group/group.entity';

import { PolicyService } from 'src/models/policy/policy.service';
import { PolicyResolver } from 'src/models/policy/policy.resolver';

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
