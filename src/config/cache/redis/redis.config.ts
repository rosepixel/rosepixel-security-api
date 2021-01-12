export const REDIS_CONFIG = {
    HOST: process.env.REDIS_HOST || "localhost",
    PORT: process.env.REDIS_PORT || 6379,
    PASSWORD: process.env.REDIS_PASSWORD || "develop",
    DB_NUMBER: process.env.DB_NUMBER || 0
}