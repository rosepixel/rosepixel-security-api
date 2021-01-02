import { RedisClient } from "redis";

import { environment } from "@environments/environment";

const redis = new RedisClient({
    port: Number(environment.redis.port),
    host: environment.redis.host,
    db: environment.redis.database
});

export { redis };