import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Claim } from 'src/models/claim/claim.entity';
import { Role } from 'src/models/role/role.entity';
import { Group } from 'src/models/group/group.entity';
import { GroupResolver } from 'src/models/group/group.resolver';
import { GroupService } from 'src/models/group/group.service';

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
