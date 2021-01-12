import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { SERVER_CONFIG } from '@config/server/server.config';
import { REDIS_CONFIG } from '@config/cache/redis/redis.config';

import { AppModule } from '@app/app.module';

const logger = new Logger("SecurityAPI");

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.REDIS,
        options: {
            url: `redis://${REDIS_CONFIG.HOST}:${REDIS_CONFIG.PORT}`,
            retryAttempts: 5,
            retryDelay: 1000
        }
    });

    app.useGlobalPipes(
        new ValidationPipe()
    );

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(
            app.get(Reflector)
        )
    );

    app.listen(SERVER_CONFIG.SERVER_PORT, () =>
        logger.log("Security successfully started")
    );
}

bootstrap();
