import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from 'src/models/role/role.entity';
import { RoleResolver } from 'src/models/role/role.resolver';
import { RoleService } from 'src/models/role/role.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    providers: [
        RoleResolver,
        RoleService
    ]
})
export class RoleModule { }
