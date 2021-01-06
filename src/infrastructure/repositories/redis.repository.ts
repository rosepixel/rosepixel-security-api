import { IRedisRepository } from "@domain/repositories/redis.repository";

class RedisReposiroty implements IRedisRepository {
    get(key: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    create(key: string, model: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(key: string, model: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    remove(key: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}