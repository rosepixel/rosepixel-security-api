import { Inject, Injectable, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

// import { ClientOptions, ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

// import { REDIS_CONFIG } from "@app/config/cache/redis/redis.config";

@Injectable()
export class RedisService {
    // public readonly client: ClientProxy;

    // constructor() {
    //     this.client = ClientProxyFactory.create({
    //         transport: Transport.REDIS,
    //         options: {
    //             url: `redis://:${REDIS_CONFIG.PASSWORD}@${REDIS_CONFIG.HOST}:${REDIS_CONFIG.PORT}/${REDIS_CONFIG.DB_NUMBER}`
    //         }
    //     } as ClientOptions);
    // }

    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

    async get(key: string): Promise<any> {
        return await this.cache.get(key);
    }

    async set(key: string, value: string) {
        await this.cache.set(key, value, 1000);
    }

    async reset() {
        await this.cache.reset();
    }

    async del(key: string) {
        await this.cache.del(key);
    }
}