import { Request, Response } from "express";
import { inject } from "inversify";
import {
    interfaces,
    controller,
    BaseHttpController,
    httpPost,
    httpGet,
    requestParam,
    request,
    response
} from "inversify-express-utils";

import { INJECTION } from "@utilities/injection";

import { UserResponse } from "@application/responses/user.response";

import { IUserAppService } from "@application/interfaces/users.service";

@controller("/users")
export class Controller extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(INJECTION.IUserAppService) private userAppService: IUserAppService) {
        super();
    }

    @httpPost("/")
    public async register(@request() request: Request, @response() response: Response) {
        try {
            const user = await this.userAppService.register(request.body.username, request.body.email, request.body.password);

            response.sendStatus(201).json(user);
        }
        catch (error) {
            response.status(400).json({ error: error.message });
        }
    }

    @httpGet("/:user_id")
    public async getById(@requestParam("user_id") user_id: string): Promise<interfaces.IHttpActionResult> {
        const user: UserResponse = await this.userAppService.getById(user_id);

        return this.ok(user);
    }
}
