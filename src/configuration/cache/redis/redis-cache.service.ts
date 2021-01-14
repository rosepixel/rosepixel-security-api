import { Inject, Injectable, CACHE_MANAGER } from "@nestjs/common";

import { Cache } from "cache-manager";

@Injectable()
export class RedisCacheService {

    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

    client() {
        return this.cache;
    }
}