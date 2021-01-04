import { injectable } from "inversify";
import { RedisClient } from "redis";

import { environment } from "@environments/environment";

import { IRedisContext } from "@infrastructure/contexts/interfaces/redis.context";

@injectable()
export class RedisContext extends RedisClient implements IRedisContext {
    constructor() {
        super({
            port: Number(environment.redis.port),
            host: environment.redis.host,
            password: environment.redis.password,
            db: environment.redis.database
        });
    }
}
