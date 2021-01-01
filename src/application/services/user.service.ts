import { injectable, inject } from "inversify";

import { UserResponse } from "../responses/user.response";

import { INJECTION } from "settings/injection";

import { IUserService } from "@application/interfaces/users.service";

import { User } from "@domain/models/user.model";

import { IUserRepository } from "@domain/interfaces/user.repository";
import { UserRepository } from "@infrastructure/repositories/user.repository";

@injectable()
export class UserService implements IUserService {
    private _userRepository: IUserRepository;

    constructor(@inject(INJECTION.IUserRepository) userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async getById(user_id: string): Promise<UserResponse> {
        const user: User = await this._userRepository.getById(user_id);

        return new UserResponse(user.user_id, user.username);
    }
}