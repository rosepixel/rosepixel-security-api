import { inject } from "inversify";
import { httpGet, interfaces, controller, BaseHttpController } from "inversify-express-utils";

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

    @httpGet("/")
    public getById(id: string): interfaces.IHttpActionResult {
        const userResponse: UserResponse = this._userService.getById(id);

        return this.ok(userResponse);
    }
}
