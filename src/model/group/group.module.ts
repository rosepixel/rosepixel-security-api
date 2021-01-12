import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Claim } from '@model/claim/claim.entity';
import { Role } from '@model/role/role.entity';
import { Group } from '@model/group/group.entity';
import { GroupResolver } from '@model/group/group.resolver';
import { GroupService } from '@model/group/group.service';

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
