import { NestFactory, Reflector } from '@nestjs/core';
import { Logger, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';

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
        logger.log(`Running in ${config.get("environment")} mode`);
    });
}

bootstrap();
