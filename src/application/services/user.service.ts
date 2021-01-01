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

    getById(id: string): UserResponse {
        const user: User = this._userRepository.getById(id);
        
        const userResponse = new UserResponse(user.id, user.username);

        return userResponse;
    }
}