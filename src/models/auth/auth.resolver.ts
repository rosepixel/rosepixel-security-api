import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Public } from "@common/decorators/is-public.decorator";

import { AuthInput } from "@models/auth/dto/auth.input";
import { AuthType } from "@models/auth/dto/auth.type";

import { AuthService } from "@models/auth/auth.service";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Public()
    @Mutation(() => AuthType)
    public async login(
        @Args("data") data: AuthInput
    ): Promise<AuthType> {
        const authType = await this.authService.validateUser(data);

        return authType;
    }
}
