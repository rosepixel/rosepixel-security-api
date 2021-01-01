import { injectable, inject } from "inversify";

import { UserResponse } from "../responses/user.response";

import { INJECTION } from "settings/injection";

import { IUserAppService } from "@application/interfaces/users.service";

import { IUser } from "@domain/models/user.model";

import { IUserService } from "@domain/services/interfaces/user.service";
import { UserService } from "@domain/services/user.service";

@injectable()
export class UserAppService implements IUserAppService {
    private _userService: IUserService;

    constructor(@inject(INJECTION.IUserService) userService: UserService) {
        this._userService = userService;
    }

    async getById(user_id: string): Promise<UserResponse> {
        const user: IUser = await this._userService.validate(user_id);

        return new UserResponse(user.user_id, user.username);
    }
}