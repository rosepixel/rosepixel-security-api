import { RedisClient } from "redis";

export interface IRedisService {
    client: RedisClient;
}