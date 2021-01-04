import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import helmet from "helmet";

import { urlencoded, json } from 'body-parser';
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as userAgent from "express-useragent";

import { environment } from '@environments/environment';

import { INJECTION } from "@utilities/injection";

import { IUsersAppService } from "@application/interfaces/users.app-service";
import { IUsersService } from "@domain/services/interfaces/users.service";
import { IUsersRepository } from "@domain/repositories/users.repository";

import { UsersAppService } from "@application/services/users.app-service";
import { UsersService } from "@domain/services/users.service";
import { UsersRepository } from "@infrastructure/repositories/users.repository";

import { security } from "@infrastructure/contexts/security.context";

import "@controllers/user.controller";

let container = new Container();

class Server {
    constructor() {
        this.bind();
        this.start();
    }

    bind(): void {
        container.bind<IUsersAppService>(INJECTION.IUsersAppService).to(UsersAppService);
        container.bind<IUsersService>(INJECTION.IUsersService).to(UsersService);
        container.bind<IUsersRepository>(INJECTION.IUsersRepository).to(UsersRepository);
    }

    start() {
        let server: InversifyExpressServer = new InversifyExpressServer(container);

        security.authenticate().then(() => console.log("Database connected"));
        
        server.setConfig((app) => {
            app.use(urlencoded({ extended: true }));
            app.use(json());
            app.use(helmet());
            app.use(cors());
            app.use(userAgent.express());
        });

        let app = server.build();

        app.listen(environment.port, () => {
            console.log(`Servidor iniciado na porta ${environment.port}`);
        });
    }
}

const server = new Server();

export default { server };