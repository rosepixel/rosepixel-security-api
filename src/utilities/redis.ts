import { injectable } from "inversify";
import { RedisClient } from "redis";

import { environment } from "@environments/environment";

import { IRedisService } from "@utilities/interfaces/redis";

@injectable()
export class RedisService implements IRedisService {
    public readonly client: RedisClient;

    constructor() {
        this.client = new RedisClient({
            port: Number(environment.redis.port),
            host: environment.redis.host,
            password: environment.redis.password,
            db: environment.redis.database
        });
    }
}
