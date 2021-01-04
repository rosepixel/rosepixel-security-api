import { Request } from "express";
import { inject } from "inversify";
import {
    controller,
    interfaces,
    BaseHttpController,
    httpPost,
    httpGet,
    requestParam,
    request
} from "inversify-express-utils";

import { INJECTION } from "@utilities/injection";

import { IUserResponse } from "@application/responses/user.response";
import { ISessionResponse } from "@application/responses/session.response";

import { IUsersAppService } from "@application/interfaces/users.app-service";
import { ISignInRequest } from "@application/requests/sign-in.request";
import { IUserAgentRequest } from "@application/requests/user-agent.request";

@controller("/users")
export class Controller extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(INJECTION.IUsersAppService) private usersAppService: IUsersAppService) {
        super();
    }

    @httpPost("/")
    public async register(@request() request: Request): Promise<interfaces.IHttpActionResult> {
        try {
            await this.usersAppService.register(request.body.username, request.body.email, request.body.password);

            return this.ok();
        }
        catch (error) {
            return this.badRequest(error.message);
        }
    }

    @httpPost("/sign-in")
    public async signIn(@request() request: Request): Promise<interfaces.IHttpActionResult> {
        try {
            const signInRequest = {
                email: request.body.email,
                password: request.body.password,
                userAgent: {
                    ...request.useragent
                } as IUserAgentRequest
            } as ISignInRequest;

            const session: ISessionResponse = await this.usersAppService.signIn(signInRequest);

            return this.ok(session);
        } catch (error) {
            return this.badRequest(error.message);
        }
    }

    @httpGet("/:user_id")
    public async getById(@requestParam("user_id") user_id: string): Promise<interfaces.IHttpActionResult> {
        try {
            const user: IUserResponse = await this.usersAppService.getById(user_id);

            return this.ok(user);
        }
        catch (error) {
            return this.badRequest(error.message);
        }
    }
}
