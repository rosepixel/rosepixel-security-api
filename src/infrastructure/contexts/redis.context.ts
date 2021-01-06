import { RedisClient } from "redis";

import { environment } from "@environments/environment";

const redis: RedisClient = new RedisClient({
    port: Number(environment.redis.port),
    host: environment.redis.host,
    password: environment.redis.password,
    db: environment.redis.database
});

export { redis };