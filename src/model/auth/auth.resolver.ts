import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Public } from "@common/decorators/is-public.decorator";

import { AuthInput } from "@model/auth/dto/auth.input";
import { AuthType } from "@model/auth/dto/auth.type";
import { AuthService } from "@model/auth/auth.service";
import { CurrentToken } from "@app/common/decorators/current-token.decorator";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Public()
    @Mutation(() => AuthType)
    public async login(
        @Args("data") data: AuthInput
    ): Promise<AuthType> {
        return await this.authService.login(data);
    }

    @Mutation(() => Boolean)
    public async logout(@CurrentToken() token: string): Promise<Boolean> {
        await this.authService.logout(token);

        return true;
    }
}