import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { AuthInput } from "./dto/auth.input";
import { AuthType } from "./dto/auth.type";

import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => AuthType)
    public async login(
        @Args("data") data: AuthInput
    ): Promise<AuthType> {
        const authType = await this.authService.validateUser(data);

        return authType;
    }
}
