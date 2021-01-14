import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Roles } from '@model/role/role.decorator';
import { Role } from '@model/role/role.enum';

import { CreateUserInput } from '@model/user/odt/create-user.input';
import { UpdateUserInput } from '@model/user/odt/update-user.input';
import { User } from '@model/user/user.entity';
import { UserService } from '@model/user/user.service';
import { Public } from '@common/decorators/is-public.decorator';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) { }

    @Roles(Role.SecurityApiFindAllUsers)
    @Query(() => [User])
    async findAllUsers(): Promise<User[]> {
        const users = await this.userService.findAllUsers();

        return users;
    }

    @Roles(Role.SecurityApiGetUserById)
    @Query(() => User)
    async getUserById(@Args('user_id') user_id: string): Promise<User> {
        const user = await this.userService.getUserById(user_id);

        return user;
    }

    @Roles(Role.SecurityApiGetUserByEmail)
    @Query(() => User)
    async getUserByEmail(@Args('email') email: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);

        return user;
    }

    @Public()
    @Mutation(() => User)
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        const user = await this.userService.createUser(data);

        return user;
    }

    @Roles(Role.SecurityApiUpdateUser)
    @Mutation(() => User)
    async updateUser(
        @Args('user_id') user_id: string,
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        const user = this.userService.updateUser(user_id, data);

        return user;
    }
}