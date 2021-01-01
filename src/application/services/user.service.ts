import { injectable, inject } from "inversify";

import { INJECTION } from "@utilities/injection";

import { IUserAppService } from "@application/interfaces/users.service";
import { UserResponse } from "@application/responses/user.response";

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

        return new UserResponse(
            user.user_id,
            user.username,
            user.email,
            user.created_at,
            user.updated_at
        );
    }
}