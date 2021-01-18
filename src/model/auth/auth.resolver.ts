import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Public } from "@common/decorators/is-public.decorator";
import { CurrentToken } from "@common/decorators/current-token.decorator";
import { ActionResultType } from "@common/types/action-result.type";

import { AuthInput } from "@model/auth/dto/auth.input";
import { AuthType } from "@model/auth/dto/auth.type";
import { AuthService } from "@model/auth/auth.service";
import { Recaptcha } from "@nestlab/google-recaptcha";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Recaptcha()
    @Public()
    @Mutation(() => AuthType)
    public async login(
        @Args("data") data: AuthInput
    ): Promise<AuthType> {
        return await this.authService.login(data);
    }

    @Mutation(() => ActionResultType)
    public async logout(@CurrentToken() token: string): Promise<void> {
        await this.authService.logout(token);
    }
}
