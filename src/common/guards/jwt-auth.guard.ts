import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

import { IS_PUBLIC_KEY } from "@common/decorators/is-public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {

    constructor(
        private reflector: Reflector
    ) {
        super();
    }

    getRequest(context: ExecutionContext): Request {
        return GqlExecutionContext.create(context).getContext().req;
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }

    handleRequest(error: any, user: any) {
        if (error || !user) {
            throw error || new UnauthorizedException("Usuário não autorizado.")
        }
        return user;
    }
}