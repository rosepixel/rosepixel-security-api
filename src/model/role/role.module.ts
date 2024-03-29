import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from '@model/role/role.entity';
import { RoleResolver } from '@model/role/role.resolver';
import { RoleService } from '@model/role/role.service';

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
