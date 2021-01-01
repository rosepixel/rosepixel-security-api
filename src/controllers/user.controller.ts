import { inject } from "inversify";
import { httpGet, interfaces, controller, BaseHttpController, requestParam } from "inversify-express-utils";

import { INJECTION } from "settings/injection";

import { UserResponse } from "@application/responses/user.response";

import { IUserService } from "@application/interfaces/users.service";

@controller("/users")
export class Controller extends BaseHttpController implements interfaces.Controller {
    private _userService: IUserService;

    constructor(@inject(INJECTION.IUserService) userService: IUserService) {
        super();

        this._userService = userService;
    }

    @httpGet("/:user_id")
    public async getById(@requestParam("user_id") user_id: string): Promise<interfaces.IHttpActionResult> {
        const user: UserResponse = await this._userService.getById(user_id);

        return this.ok(user);
    }
}