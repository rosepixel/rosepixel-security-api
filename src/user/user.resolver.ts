import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput } from './odt/create-user.input';
import { UpdateUserInput } from './odt/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [User])
    async findAllUsers(): Promise<User[]> {
        const users = await this.userService.findAllUsers();

        return users;
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => User)
    async getUserById(@Args('userId') userId: string): Promise<User> {
        const user = await this.userService.getUserById(userId);

        return user;
    }

    @Query(() => User)
    async getUserByEmail(@Args('email') email: string): Promise<User> {
        const user = await this.userService.getUserByEmail(email);

        return user;
    }

    @Mutation(() => User)
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        const user = await this.userService.createUser(data);

        return user;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async updateUser(
        @Args('userId') userId: string,
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        const user = this.userService.updateUser(userId, data);

        return user;
    }
}
