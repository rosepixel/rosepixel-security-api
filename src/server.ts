import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import helmet from "helmet";

import { urlencoded, json } from 'body-parser';
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import { environment } from '@environments/environment';

import { INJECTION } from "@utilities/injection";

import { IUserAppService } from "@application/interfaces/users.service";
import { UserAppService } from "@application/services/user.service";

import { IUserService } from "@domain/services/interfaces/user.service";
import { UserService } from "@domain/services/user.service";

import { IUserRepository } from "@domain/interfaces/user.repository";
import { UserRepository } from "@infrastructure/repositories/user.repository";

import "@controllers/user.controller";
import { RedisService } from "@utilities/redis";
import { IRedisService } from "@utilities/interfaces/redis";

let container = new Container();

class Server {
    constructor() {
        this.bind();
        this.start();
    }

    bind(): void {
        container.bind<IRedisService>(INJECTION.IRedisService).to(RedisService);

        container.bind<IUserAppService>(INJECTION.IUserAppService).to(UserAppService);
        container.bind<IUserService>(INJECTION.IUserService).to(UserService);
        container.bind<IUserRepository>(INJECTION.IUserRepository).to(UserRepository);
    }

    start() {
        let server: InversifyExpressServer = new InversifyExpressServer(container);

        server.setConfig((app) => {
            app.use(urlencoded({ extended: true }));
            app.use(json());
            app.use(helmet());
            app.use(cors());
        });

        let app = server.build();

        app.listen(environment.port, () => {
            console.log(`Servidor iniciado na porta ${environment.port}`);
        });
    }
}

const server = new Server();

export default { server };