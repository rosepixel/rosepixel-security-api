import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Policy } from './policy.entity';
import { Claim } from 'src/claim/claim.entity';
import { Role } from 'src/role/role.entity';
import { Group } from 'src/group/group.entity';

import { PolicyService } from './policy.service';
import { PolicyResolver } from './policy.resolver';

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
