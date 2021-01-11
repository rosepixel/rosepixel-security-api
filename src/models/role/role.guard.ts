import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";

import { Role } from "src/models/role/role.enum";
import { ROLES_KEY } from "src/models/role/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const execution = GqlExecutionContext.create(context);

        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!roles) {
            return true;
        }

        const user = execution.getContext().req.user;
        
        if (!user) {
            return false;
        }

        return roles.some((role) => user.roles?.include(role));
    }
}