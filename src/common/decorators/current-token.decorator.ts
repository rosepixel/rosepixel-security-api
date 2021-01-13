import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentToken = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const execution = GqlExecutionContext.create(context);
        const request = execution.getContext().req;
        const authorization = request.get("Authorization");

        if (authorization) {
            return authorization.replace("Bearer ", "");
        }
    },
);