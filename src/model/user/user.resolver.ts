import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Public } from "@common/decorators/is-public.decorator";
import { ActionResultType } from "@common/types/action-result.type";

import { Roles } from "@model/role/role.decorator";
import { Role } from "@model/role/role.enum";
import { CreateUserInput } from "@model/user/odt/create-user.input";
import { UpdateUserInput } from "@model/user/odt/update-user.input";
import { User } from "@model/user/user.entity";
import { UserService } from "@model/user/user.service";
import { Recaptcha } from "@nestlab/google-recaptcha";

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) { }

    @Roles(Role.SecurityApiUserFindAllUsers)
    @Query(() => [User])
    async findAllUsers(): Promise<User[]> {
        return await this.userService.findAllUsers();
    }

    @Roles(Role.SecurityApiUserGetUserById)
    @Query(() => User)
    async getUserById(@Args("user_id") user_id: string): Promise<User> {
        return await this.userService.getUserById(user_id);
    }

    @Roles(Role.SecurityApiUserGetUserByEmail)
    @Query(() => User)
    async getUserByEmail(@Args("email") email: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);

        return user;
    }

    @Recaptcha()
    @Public()
    @Mutation(() => User)
    async createUser(@Args("data") data: CreateUserInput): Promise<User> {
        return await this.userService.createUser(data);
    }

    @Roles(Role.SecurityApiUserUpdateUser)
    @Mutation(() => User)
    async updateUser(
        @Args("user_id") user_id: string,
        @Args("data") data: UpdateUserInput
    ): Promise<User> {
        return this.userService.updateUser(user_id, data);
    }

    @Recaptcha()
    @Mutation(() => ActionResultType)
    public async resetPassword(@Args("email") email: string): Promise<ActionResultType> {
        await this.userService.resetPassword(email);

        return new ActionResultType();
    }
}