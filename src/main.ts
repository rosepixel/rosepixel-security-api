import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
    Logger,
    ClassSerializerInterceptor,
    ValidationPipe
} from '@nestjs/common';

import { AppModule } from './app.module';

const logger = new Logger("SecurityAPI");

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe()
    );

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(
            app.get(Reflector)
        )
    );

    app.listen(config.get("port"), () => {
        logger.log("Security successfully started");
        logger.log(`Running in ${config.get("host")}:${config.get("port")} in ${config.get("environment")} mode`);
    });
}

bootstrap();
