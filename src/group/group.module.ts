import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Claim } from 'src/claim/claim.entity';
import { Role } from 'src/role/role.entity';
import { Group } from './group.entity';

import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Group, Claim, Role]),
    ],
    providers: [
        GroupService,
        GroupResolver
    ]
})
export class GroupModule { }
